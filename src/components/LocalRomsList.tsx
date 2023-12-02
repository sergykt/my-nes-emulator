import type { FC } from 'react';
import type { IRom } from '../types';

interface ILocalRomsListProps {
  list: IRom[];
}

const LocalRomsList: FC<ILocalRomsListProps> = ({ list }) => (
  <div className='localromslist'>
    <h2 className='localromslist__title'>Local roms</h2>
    <ol className='localromslist__list'>
      {list.map((item) => (
        <li className='localromslist__item' key={item.id}>
          <a href={`/emulator/?id=${item.id}`}>{item.name}</a>
        </li>
      ))}
    </ol>
  </div>
);

export default LocalRomsList;
