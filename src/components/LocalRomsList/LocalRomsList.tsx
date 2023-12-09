import type { FC } from 'react';
import type { IRom } from '@src/types';
import { IoIosRemoveCircleOutline } from 'react-icons/io';

interface ILocalRomsListProps {
  list: IRom[];
  removeRomHandler: (id: number) => void;
}

const LocalRomsList: FC<ILocalRomsListProps> = ({ list, removeRomHandler }) => {
  return (
    <div className='localromslist'>
      <h2 className='localromslist__title'>Local roms</h2>
      <ol className='localromslist__list'>
        {list.map((item) => (
          <li className='localromslist__item' key={item.id}>
            <a href={`/emulator/?id=${item.id}`} className='localromslist__link'>
              {item.name}
            </a>
            <button
              className='localromslist__remove-button'
              type='button'
              aria-label='remove item'
              onClick={() => removeRomHandler(item.id)}
            >
              <IoIosRemoveCircleOutline />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LocalRomsList;
