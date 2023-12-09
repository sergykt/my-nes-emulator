import type { FC } from 'react';
import FancyLink from '@components/FancyLink';
import games from '@src/engine/games';
import styles from './GamesList.module.scss';

const GamesList: FC = () => (
  <div className={styles.gamesList}>
    <h2 className={styles.title}>List Of Games</h2>
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

export default GamesList;
