import { useEffect, useState } from 'react';

function useListenThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const node = document.documentElement;
    const options = {
      attributes: true,
    };

    function callback() {
      const nodes = document.getElementsByClassName('dark');
      setIsDarkMode(!!nodes.length);
    }

    const observer = new MutationObserver(callback);
    observer.observe(node, options);
    callback();
  }, []);

  // watch for a specific class change
  return { isDarkMode, isLightMode: !isDarkMode };
}

export default useListenThemeMode;
