import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: makes it a smooth scroll
    });
  }, [pathname]);

  return null; // this component doesn't render anything
}

export { ScrollToTop };
export default ScrollToTop;