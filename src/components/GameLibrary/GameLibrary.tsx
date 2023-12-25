import type { FC } from 'react';
import FancyLink from '@components/FancyLink';
import games from '@/engine/games';
import styles from './GameLibrary.module.scss';

const GamesLibrary: FC = () => (
  <div className={styles.body}>
    <h2 className={styles.title}>Game Library</h2>
    <div className={styles.list}>
      {games.map(({ id, name, shortName, img, description }) => (
        <div className={styles.item} key={id}>
          <a className={styles.link} href={`/emulator/${shortName}`} aria-label={name}>
            <picture>
              <source srcSet={`/img/games/${img}.webp`} type='image/webp' />
              <source srcSet={`/img/games/${img}.jpg`} type='image/jpeg' />
              <img
                src={`/img/games/${img}.jpg`}
                width={150}
                height={200}
                loading='lazy'
                className={styles.img}
                alt={name}
              />
            </picture>
          </a>
          <div className={styles.right}>
            <FancyLink className={styles.name} href={`/emulator/${shortName}`}>
              {name}
            </FancyLink>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GamesLibrary;
