import type { FC } from 'react';
import { useEffect, useState } from 'react';

const ScrollButton: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY ?? document.documentElement.scrollTop;

      if (scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button className={isVisible ? 'scroll-button scroll-button_active' : 'scroll-button'} type="button" onClick={scrollToTop}>
      <svg viewBox="-0.51 -0.51 18.02 18.02" width="45px" height="45px" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M8.5 5.793l4.354 4.354-0.707 0.707-3.647-3.647-3.646 3.646-0.707-0.707 4.353-4.353zM17 8.5c0 4.687-3.813 8.5-8.5 8.5s-8.5-3.813-8.5-8.5 3.813-8.5 8.5-8.5 8.5 3.813 8.5 8.5zM16 8.5c0-4.136-3.364-7.5-7.5-7.5s-7.5 3.364-7.5 7.5 3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5z"></path>
        </g>
      </svg>
    </button>
  );
};

export default ScrollButton;
