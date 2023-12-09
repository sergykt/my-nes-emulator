import type { FC } from 'react';
import Container from '@components/Container';
import styles from './Header.module.scss';

const Header: FC = () => (
  <header className={styles.header}>
    <Container className={styles.container}>
      <a href='/'>
        <picture>
          <source srcSet='/img/gaming_logo.webp' type='image/webp' />
          <source srcSet='/img/gaming_logo.png' type='image/png' />
          <img
            className={styles.logo}
            src='/img/gaming_logo.png'
            width={50}
            height={50}
            loading='lazy'
            alt='logo'
          />
        </picture>
      </a>
      <p className={styles.title}>NES Emulator</p>
    </Container>
  </header>
);

export default Header;
