import { useCallback, useEffect, useRef, type MutableRefObject } from 'react';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
  }, []);

  return useCallback(
    (...args: T[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackLatest.current(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export const useThrottle = <T>(callback: (...args: T[]) => void, delay: number) => {
  const throttleRef = useRef(false);
  const callbackLatest = useLatest(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
    [callback, delay]
  );
};
