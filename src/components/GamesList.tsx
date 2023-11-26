import type { FC } from 'react';
import games from '../nes_engine/games';

const GamesList: FC = () => (
  <div className="games">
    <h2 className="games__title">List Of Games</h2>
    <div className="games__list">
      {games.map(({ id, name, shortName, img, description }) => (
        <div className="games__item" key={id}>
          <a className="games__link" href={`/emulator/${shortName}`} aria-label={name}>
            <img
              src={`/img/games/${img}`}
              width={150}
              height={200}
              loading="lazy"
              className="games__img"
              alt={name}
            />
          </a>
          <div className="games__right">
            <a href={`/emulator/${shortName}`} className="games__name">
              {name}
            </a>
            <p className="games__description">{description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GamesList;
