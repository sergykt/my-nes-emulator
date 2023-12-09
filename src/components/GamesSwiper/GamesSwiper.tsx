import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, FreeMode, Keyboard, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import games from '@src/engine/games';
import styles from './GamesSwiper.module.scss';

const GamesSwiper: FC = () => (
  <Swiper
    modules={[Pagination, A11y, FreeMode, Keyboard, Navigation]}
    spaceBetween={10}
    slidesPerView={1}
    pagination={{ clickable: true, dynamicBullets: true }}
    breakpoints={{
      350: {
        slidesPerView: 2,
      },
      525: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      },
    }}
    freeMode
    navigation
    keyboard={{
      enabled: true,
      onlyInViewport: true,
    }}
    className={styles.gamesSwiper}
  >
    {games.map(({ id, name, shortName, img }) => (
      <SwiperSlide key={id}>
        <a href={`/emulator/${shortName}`} aria-label={name}>
          <picture>
            <source srcSet={`/img/games/${img}.webp`} type='image/webp' />
            <source srcSet={`/img/games/${img}.jpg`} type='image/jpeg' />
            <img
              src={`/img/games/${img}.jpg`}
              width={150}
              height={200}
              className={styles.img}
              loading='lazy'
              alt={name}
            />
          </picture>
          <div className='swiper-lazy-preloader swiper-lazy-preloader-white' />
        </a>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default GamesSwiper;
