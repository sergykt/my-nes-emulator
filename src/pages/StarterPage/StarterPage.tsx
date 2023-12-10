import type { FC } from 'react';
import PageLayout from '@src/components/PageLayout';
import GamesList from '@components/GamesList';
import Container from '@components/Container';
import styles from './StarterPage.module.scss';

const StarterPage: FC = () => (
  <PageLayout>
    <div className={styles.starter}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Nintendo Entertainment System Emulator</h1>
        <p className={styles.subtitle}>
          The 8-bit Nintendo NES, released in the 1980s, stands as a timeless icon in the world of
          retro gaming, revolutionizing the landscape of video games. With its groundbreaking
          technology and an extensive library of classic titles, the NES holds a special place in
          the hearts of gamers who fondly remember the golden era of pixelated adventures and
          unforgettable characters. Immerse yourself in the nostalgia, relive the joy of classic
          gameplay, and experience the enduring legacy of the Nintendo Entertainment System on our
          retro gaming platform. Welcome to a journey through time where every pixel tells a story,
          and the spirit of the 8-bit era lives on!
        </p>
        <div className={styles.images}>
          <div className={styles.imageBody}>
            <picture>
              <source srcSet='/img/nes_1.webp' type='image/webp' />
              <source srcSet='/img/nes_1.png' type='image/png' />
              <img
                className={styles.image}
                src='/img/nes_1.png'
                alt='nes1'
                loading='lazy'
                width={866}
                height={435}
              />
            </picture>
          </div>
          <div className={styles.imageBody}>
            <picture>
              <source srcSet='/img/nes_2.webp' type='image/webp' />
              <source srcSet='/img/nes_2.png' type='image/png' />
              <img
                className={styles.image}
                src='/img/nes_2.png'
                alt='nes2'
                loading='lazy'
                width={943}
                height={578}
              />
            </picture>
          </div>
        </div>
        <GamesList />
      </Container>
    </div>
  </PageLayout>
);

export default StarterPage;
