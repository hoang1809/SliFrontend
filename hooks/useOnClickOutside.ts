import { useEffect } from 'react';

const useOnClickOutside = (ref: any, handler: any, exceptionRef?: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        exceptionRef?.current?.contains(event.target)
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler, exceptionRef]);
};

export default useOnClickOutside;
