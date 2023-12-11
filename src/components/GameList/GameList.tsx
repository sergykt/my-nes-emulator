import type { FC, ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Container from '@components/Container';
import FancyLink from '@components/FancyLink';
import games from '@src/engine/games';
import styles from './GameList.module.scss';

const GameList: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.body}>
      <Container className={styles.container}>
        <form id='searchForm' className={styles.form} onSubmit={handleSubmit}>
          <label id='searchLabel' htmlFor='gameName' className={styles.label}>
            <div className={styles.icon}>
              <FaSearch />
            </div>
            <input
              className={styles.input}
              type='text'
              name='gameName'
              id='gameName'
              placeholder='Search a game'
              aria-labelledby='searchLabel'
              onChange={handleChange}
              value={searchQuery}
              ref={inputRef}
              autoComplete='off'
            />
          </label>
        </form>
        <ul className={styles.list}>
          {games.map(({ id, name, shortName }) => {
            return (
              name.toLowerCase().includes(searchQuery.toLowerCase()) && (
                <li key={id}>
                  <FancyLink href={`/emulator/${shortName}`} aria-label={name}>
                    {name}
                  </FancyLink>
                </li>
              )
            );
          })}
        </ul>
      </Container>
    </div>
  );
};

export default GameList;
