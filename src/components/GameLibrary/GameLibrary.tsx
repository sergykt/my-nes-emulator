import { memo, type FC } from 'react';
import games from '@/engine/games';
import styles from './GameLibrary.module.scss';
import ItemGameLibrary from './ItemGameLibrary';

const GamesLibrary: FC = memo(() => {
  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Game Library</h2>
      <div className={styles.list}>
        {games.map(({ id, name, shortName, img, description }) => (
          <ItemGameLibrary
            key={id}
            name={name}
            shortName={shortName}
            img={img}
            description={description}
          />
        ))}
      </div>
    </div>
  );
});

export default GamesLibrary;
