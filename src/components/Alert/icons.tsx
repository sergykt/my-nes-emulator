import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { AlertType } from '@/types';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

const icons = {
  [AlertType.MUTE]: RiVolumeMuteFill,
  [AlertType.UNMUTE]: RiVolumeUpFill,
  [AlertType.START]: IoIosPlay,
  [AlertType.PAUSE]: IoIosPause,
} as const;

export default icons;
