import type { FC } from 'react';
import Container from './Container';

const Header: FC = () => (
  <header className='header'>
    <Container className='header__container'>
      <a href='/'>
        <img
          className='header__logo'
          src='/img/gaming_logo.png'
          width={50}
          height={50}
          loading='lazy'
          alt='logo'
        />
      </a>
      <p className='header__title'>NES Emulator</p>
    </Container>
  </header>
);

export default Header;
