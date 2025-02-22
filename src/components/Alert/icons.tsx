import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { ALERT_TYPE } from '@/types';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

const icons = {
  [ALERT_TYPE.MUTE]: RiVolumeMuteFill,
  [ALERT_TYPE.UNMUTE]: RiVolumeUpFill,
  [ALERT_TYPE.START]: IoIosPlay,
  [ALERT_TYPE.PAUSE]: IoIosPause,
} as const;

export default icons;
