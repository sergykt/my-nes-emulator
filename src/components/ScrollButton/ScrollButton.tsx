import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import classNames from 'classnames';
import styles from './ScrollButton.module.scss';

const ScrollButton: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
    >
      <TfiArrowCircleUp />
    </button>
  );
};

export default ScrollButton;
