import type { FC, ChangeEvent, FormEvent, PointerEvent } from 'react';
import { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import games from '@/engine/games';
import styles from './SearchBar.module.scss';

const SearchBar: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleClear = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSearchQuery('');
  };

  const filteredGames = games
    .filter(
      ({ name }) => searchQuery.length > 1 && name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 8);

  return (
    <div className={styles.body}>
      <form id='searchForm' className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label id='searchLabel' htmlFor='gameName' className={styles.label}>
            <div className={styles.icon}>
              <FaSearch />
            </div>
            <input
              className={styles.input}
              type='text'
              name='gameName'
              id='gameName'
              placeholder='Search'
              aria-labelledby='searchLabel'
              onChange={handleChange}
              value={searchQuery}
              autoComplete='off'
              ref={inputRef}
            />
          </label>
          {searchQuery.length > 0 && (
            <div
              className={styles.clearButton}
              role='button'
              aria-label='clear input'
              onPointerDown={handleClear}
            >
              <IoIosCloseCircle />
            </div>
          )}
        </div>
        <div className={styles.closeButton}>Cancel</div>
      </form>
      {filteredGames.length > 0 && (
        <div className={styles.listBody}>
          <ul className={styles.list}>
            {filteredGames.map(({ id, name, shortName }) => (
              <li key={id}>
                <a className={styles.link} href={`/emulator/${shortName}`} aria-label={name}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
