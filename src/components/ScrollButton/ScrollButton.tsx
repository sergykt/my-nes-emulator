import { useEffect, useState, memo, useRef } from 'react';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import classNames from 'clsx';
import styles from './ScrollButton.module.scss';

const ScrollButton = memo(() => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    ref.current?.blur();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const className = classNames(styles.scrollButton, { [styles.visible]: isVisible });

  return (
    <button
      className={className}
      type='button'
      aria-label='scroll to top'
      aria-hidden={!isVisible}
      onClick={scrollToTop}
      ref={ref}
    >
      <TfiArrowCircleUp />
    </button>
  );
});

export default ScrollButton;
