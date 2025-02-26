import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';

export const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  ref.current = value;

  return ref;
};

export const useDebounce = <T>(callback: (...args: T[]) => void, delay: number) => {
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const callbackLatest = useLatest(callback);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  return useCallback(
    (...args: T[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackLatest.current(...args);
      }, delay);
    },
    [delay]
  );
};

export const useThrottle = <T>(callback: (...args: T[]) => void, delay: number) => {
  const throttleRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackLatest = useLatest(callback);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  return useCallback(
    (...args: T[]) => {
      if (!throttleRef.current) {
        callbackLatest.current(...args);
        throttleRef.current = true;

        timerRef.current = setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [delay]
  );
};

export const useCursor = (hideTimeout = 4000, throttleInterval = 100) => {
  const [cursorHidden, setCursorHidden] = useState(true);
  const cursorHiddenLatest = useLatest(cursorHidden);

  const handleHideCursor = useDebounce(() => {
    setCursorHidden(true);
  }, hideTimeout);

  const onMouseMove = useThrottle(() => {
    if (cursorHiddenLatest.current) {
      setCursorHidden(false);
    }
    handleHideCursor();
  }, throttleInterval);

  return { cursorHidden, onMouseMove };
};
