import { useCallback, useRef, type MutableRefObject } from 'react';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const timer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  return useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export const useThrottle = (callback: (...args: unknown[]) => void, delay: number) => {
  const throttleRef = useRef(false);

  return useCallback(
    (...args: unknown[]) => {
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;

        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
};

export const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
