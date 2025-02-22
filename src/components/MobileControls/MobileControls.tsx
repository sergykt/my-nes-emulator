import { memo, type FC } from 'react';
import { SlClose } from 'react-icons/sl';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import styles from './MobileControls.module.scss';

interface MobileControlsProps {
  isStarted: boolean;
  isPaused: boolean;
  isMuted: boolean;
  volumeHandler: () => void;
  pauseHandler: () => void;
  exitFullScreenHandler: () => void;
}

const MobileControls: FC<MobileControlsProps> = memo((props) => {
  const { isStarted, isPaused, isMuted, volumeHandler, pauseHandler, exitFullScreenHandler } =
    props;

  return (
    <div className={styles.controls}>
      <button
        className={styles.controlsButton}
        onClick={volumeHandler}
        type='button'
        aria-label='sound button'
      >
        {isMuted ? <RiVolumeMuteFill /> : <RiVolumeUpFill />}
      </button>
      {isStarted && (
        <button
          className={styles.controlsButton}
          onClick={pauseHandler}
          type='button'
          aria-label='pause button'
        >
          {isPaused ? <BsPlayCircle /> : <BsPauseCircle />}
        </button>
      )}
      <button
        className={styles.controlsButton}
        onClick={exitFullScreenHandler}
        type='button'
        aria-label='close'
      >
        <SlClose />
      </button>
    </div>
  );
});

export default MobileControls;
