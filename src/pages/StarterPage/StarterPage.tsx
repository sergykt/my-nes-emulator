import type { FC } from 'react';
import PageLayout from '@/components/PageLayout';
import GameLibrary from '@/components/GameLibrary';
import Container from '@/components/Container';
import styles from './StarterPage.module.scss';

const StarterPage: FC = () => (
  <PageLayout>
    <div className={styles.starter}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Nintendo Entertainment System Emulator</h1>
        <p className={styles.subtitle}>
          The Nintendo Entertainment System, released in the 1980s, remains an enduring symbol in
          the realm of retro gaming, fundamentally reshaping the landscape of video games. With its
          pioneering technology and a vast library of beloved classics, the NES holds a cherished
          spot in the hearts of gamers who nostalgically recall the golden age of pixelated
          adventures and memorable characters. Immerse yourself in this nostalgia, rediscover the
          thrill of vintage gameplay, and embrace the enduring legacy of the NES on our retro gaming
          platform. Step into a journey through time, where every pixel narrates a tale, and the
          essence of the 8-bit era continues to thrive!
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
        <GameLibrary />
      </Container>
    </div>
  </PageLayout>
);

export default StarterPage;
