import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <a href="/">
          <img className="header__logo" src="/img/gaming_logo.png" width={50} height={50} loading="lazy" alt="logo" />
        </a>
        <p className="header__title">
          NES Emulator
        </p>
      </div>
    </header>
  );
};

export default Header;
