import type { FC } from 'react';
import type { IRom } from '@src/types';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import styles from './LocalRomsList.module.scss';

interface ILocalRomsListProps {
  list: IRom[];
  removeRomHandler: (id: number) => void;
}

const LocalRomsList: FC<ILocalRomsListProps> = ({ list, removeRomHandler }) => {
  return (
    <div className={styles.localromslist}>
      <h2 className={styles.title}>Local roms</h2>
      <ul className={styles.list}>
        {list.map((item) => (
          <li className={styles.item} key={item.id}>
            <a href={`/emulator/?id=${item.id}`} className={styles.link}>
              {item.name}
            </a>
            <button
              className={styles.removeButton}
              type='button'
              aria-label='remove item'
              onClick={() => removeRomHandler(item.id)}
            >
              <IoIosRemoveCircleOutline />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalRomsList;
