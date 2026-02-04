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

  const handleClear = (e: PointerEvent<HTMLDivElement> | KeyboardEvent) => {
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
          <label id='searchLabel' htmlFor='game-name' className={styles.label}>
            <span className='sr-only'>Search games</span>
            <div className={styles.icon}>
              <FaSearch aria-hidden='true' />
            </div>
            <input
              id='game-name'
              className={styles.input}
              type='text'
              name='gameName'
              placeholder='Search'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={searchQuery}
              autoComplete='off'
              aria-describedby='search-results-count'
            />
          </label>
          {searchQuery.length > 0 && (
            <div
              tabIndex={0}
              className={styles.clearButton}
              role='button'
              aria-label='Clear search input'
              onPointerDown={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClear(e);
                }
              }}
            >
              <IoIosCloseCircle aria-hidden='true' />
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
                <a
                  onPointerDown={(e) => e.preventDefault()}
                  className={styles.link}
                  href={`/emulator/${shortName}`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div id='search-results-count' className='sr-only' aria-live='polite'>
        {searchQuery.length === 0
          ? ''
          : filteredGames.length > 0
            ? `${filteredGames.length} result${filteredGames.length > 1 ? 's' : ''}`
            : 'No results'}
      </div>
    </div>
  );
});

export default SearchBar;
