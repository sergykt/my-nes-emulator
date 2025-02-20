import { memo } from 'react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useRomStore } from '@/store';
import FancyLink from '@/components/FancyLink';
import styles from './LocalRomsList.module.scss';

const LocalRomsList = memo(() => {
  const { roms, removeRom } = useRomStore();

  if (roms.length === 0) {
    return null;
  }

  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Local roms</h2>
      <ul className={styles.list}>
        {roms.map((item) => (
          <li className={styles.item} key={item.id}>
            <FancyLink href={`/emulator/local?id=${item.id}`}>{item.name}</FancyLink>
            <button
              className={styles.removeButton}
              type='button'
              aria-label='remove item'
              onClick={() => removeRom(item.id)}
            >
              <IoIosRemoveCircleOutline />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default LocalRomsList;
