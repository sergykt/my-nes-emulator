import type { FC } from 'react';
import type { IRom } from '@/types';
import FancyLink from '@components/FancyLink';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import styles from './LocalRomsList.module.scss';

interface ILocalRomsListProps {
  list: IRom[];
  removeRomHandler: (id: number) => void;
}

const LocalRomsList: FC<ILocalRomsListProps> = (props) => {
  const { list, removeRomHandler } = props;

  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Local roms</h2>
      <ul className={styles.list}>
        {list.map((item) => (
          <li className={styles.item} key={item.id}>
            <FancyLink href={`/emulator/?id=${item.id}`}>{item.name}</FancyLink>
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
