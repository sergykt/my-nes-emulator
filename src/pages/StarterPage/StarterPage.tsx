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
          The Nintendo Entertainment System, a retro gaming icon of the 1980s, revolutionized video
          games with its pioneering technology and timeless classics. Relive the nostalgia,
          experience vintage gameplay, and celebrate the enduring legacy of the 8-bit era on our
          platform!
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
