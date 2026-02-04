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
        onPointerDown={volumeHandler}
        type='button'
        aria-label={isMuted ? 'unmute' : 'mute'}
      >
        {isMuted ? <RiVolumeMuteFill aria-hidden="true" /> : <RiVolumeUpFill aria-hidden="true" />}
      </button>
      {isStarted && (
        <button
          className={styles.controlsButton}
          onPointerDown={pauseHandler}
          type='button'
          aria-label={isPaused ? 'resume game' : 'pause game'}
        >
          {isPaused ? <BsPlayCircle aria-hidden="true" /> : <BsPauseCircle aria-hidden="true" />}
        </button>
      )}
      <button
        className={styles.controlsButton}
        onPointerDown={exitFullScreenHandler}
        type='button'
        aria-label='leave full screen'
      >
        <SlClose aria-hidden="true" />
      </button>
    </div>
  );
});

export default MobileControls;
