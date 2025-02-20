import {
  useState,
  memo,
  type FC,
  type ChangeEvent,
  type FormEvent,
  type PointerEvent,
  type KeyboardEvent,
} from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import games from '@/engine/games';
import styles from './SearchBar.module.scss';

const SearchBar: FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleClear = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSearchQuery('');
  };

  const handleBodyClick = (e: PointerEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
    }
  };

  const filteredGames = games
    .filter(
      ({ name }) => searchQuery.length > 1 && name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 8);

  return (
    <div className={styles.body} onPointerDown={handleBodyClick}>
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
              aria-label='search'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={searchQuery}
              autoComplete='off'
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
        <div className={styles.closeButton}>Close</div>
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
});

export default SearchBar;
