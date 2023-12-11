import type { FC } from 'react';
import { useAppDispatch } from '@src/hooks';
import { toggleSearchBar } from '@store/searchBarSlice';
import Container from '@components/Container';
import Button from '@components/Button';
import styles from './Header.module.scss';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(toggleSearchBar());
  };

  return (
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
        <Button onClick={onClick}>Game List</Button>
      </Container>
    </header>
  );
};

export default Header;
