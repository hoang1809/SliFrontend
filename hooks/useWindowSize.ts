import { useEffect, useState } from 'react';
const MOBILE_PX = 768;
const TABLET_PX = 1240;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<any>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return {
    isMobile: windowSize.width < MOBILE_PX,
    isMinTablet: windowSize.width >= TABLET_PX,
    height: windowSize.height,
    width: windowSize.width,
  };
};

export default useWindowSize;
