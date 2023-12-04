import type { FC } from 'react';
import Container from '@components/Container';

const Header: FC = () => (
  <header className='header'>
    <Container className='header__container'>
      <a href='/'>
        <picture>
          <source srcSet='/img/gaming_logo.webp' type='image/webp' />
          <source srcSet='/img/gaming_logo.png' type='image/png' />
          <img
            className='header__logo'
            src='/img/gaming_logo.png'
            width={50}
            height={50}
            loading='lazy'
            alt='logo'
          />
        </picture>
      </a>
      <p className='header__title'>NES Emulator</p>
    </Container>
  </header>
);

export default Header;
