import type { FC } from 'react';
import GamesList from '../components/GamesList';

const StarterPage: FC = () => (
  <div className='starter'>
    <div className='container starter__container'>
      <h1 className='starter__title'>Nintendo Entertainment System Emulator</h1>
      <p className='starter__subtitle'>
        The 8-bit Nintendo NES, released in the 1980s, stands as a timeless icon in the world of
        retro gaming, revolutionizing the landscape of video games. With its groundbreaking
        technology and an extensive library of classic titles, the NES holds a special place in the
        hearts of gamers who fondly remember the golden era of pixelated adventures and
        unforgettable characters. Immerse yourself in the nostalgia, relive the joy of classic
        gameplay, and experience the enduring legacy of the Nintendo Entertainment System on our
        retro gaming platform. Welcome to a journey through time where every pixel tells a story,
        and the spirit of the 8-bit era lives on!
      </p>
      <div className='starter__images'>
        <div className='starter__image-item'>
          <img
            className='starter__image'
            src='/img/nes_1.png'
            alt='nes1'
            loading='lazy'
            width={866}
            height={435}
          />
        </div>
        <div className='starter__image-item'>
          <img
            className='starter__image'
            src='/img/nes_2.png'
            alt='nes2'
            loading='lazy'
            width={943}
            height={578}
          />
        </div>
      </div>
      <GamesList />
    </div>
  </div>
);

export default StarterPage;
