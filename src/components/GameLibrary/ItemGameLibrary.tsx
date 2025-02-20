import { memo, useState } from 'react';
import classNames from 'clsx';
import FancyLink from '@/components/FancyLink';
import styles from './GameLibrary.module.scss';

interface ItemGameLibraryProps {
  name: string;
  shortName: string;
  img: string;
  description: string;
}

const ItemGameLibrary = memo((props: ItemGameLibraryProps) => {
  const { name, shortName, img, description } = props;

  const [hiddenText, setHiddenText] = useState<boolean>(true);

  const handleToggleText = () => {
    setHiddenText(!hiddenText);
  };

  const buttonText = hiddenText ? 'Show more' : 'Show less';

  const textClass = classNames(styles.description, {
    [styles.truncate]: hiddenText,
  });

  return (
    <div className={styles.item}>
      <a className={styles.link} href={`/emulator/${shortName}`} aria-label={name}>
        <picture>
          <source srcSet={`/img/games/${img}.webp`} type='image/webp' />
          <source srcSet={`/img/games/${img}.jpg`} type='image/jpeg' />
          <img
            src={`/img/games/${img}.jpg`}
            width={150}
            height={200}
            loading='lazy'
            className={styles.img}
            alt={name}
          />
        </picture>
      </a>
      <div className={styles.right}>
        <FancyLink className={styles.name} href={`/emulator/${shortName}`}>
          {name}
        </FancyLink>
        <p className={textClass}>{description}</p>
        <button className={styles.button} type='button' onClick={handleToggleText}>
          {buttonText}
        </button>
      </div>
    </div>
  );
});

export default ItemGameLibrary;
