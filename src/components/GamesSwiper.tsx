import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, FreeMode, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import games from '../nes_engine/games';

const GamesSwiper: FC = () => {
  return (
    <Swiper
      modules={[Pagination, A11y, FreeMode, Keyboard]}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true, dynamicBullets: true }}
      breakpoints={{
        350: {
          slidesPerView: 2
        },
        525: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 4
        },
        1024: {
          slidesPerView: 6
        }
      }}
      freeMode={true}
      keyboard={{
        enabled: true,
        onlyInViewport: true
      }}
      className="games-swiper"
    >
      {games.map(({ id, name, shortName, img }) => (
        <SwiperSlide key={id}>
          <a href={`/emulator/${shortName}`} aria-label={name}>
            <img src={`/img/games/${img}`} width={150} height={200} className="games-swiper__img" loading="lazy" alt={name} />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GamesSwiper;
