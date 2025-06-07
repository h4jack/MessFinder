import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from './module/js/scrollToTop'; // path as needed

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop(); // scrolls on route change
  }, [pathname]);

  return null;
};

export default ScrollToTop;
