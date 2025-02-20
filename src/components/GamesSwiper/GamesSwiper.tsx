import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import games from '@/engine/games';
import styles from './GamesSwiper.module.scss';

const GamesSwiper = memo(() => {
  return (
    <Swiper
      modules={[Pagination, A11y, Navigation]}
      spaceBetween={16}
      slidesPerView='auto'
      pagination={{ clickable: true, dynamicBullets: true }}
      navigation
      className={styles.gamesSwiper}
    >
      {games.map(({ id, name, shortName, img }) => (
        <SwiperSlide key={id}>
          <a className={styles.link} href={`/emulator/${shortName}`} aria-label={name}>
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
});

export default GamesSwiper;
