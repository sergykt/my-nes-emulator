import { IconType } from 'react-icons';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { AlertType } from '@/types';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

const icons: Record<AlertType, IconType> = {
  [AlertType.MUTE]: RiVolumeMuteFill as IconType,
  [AlertType.UNMUTE]: RiVolumeUpFill as IconType,
  [AlertType.START]: IoIosPlay as IconType,
  [AlertType.PAUSE]: IoIosPause as IconType,
};

export default icons;
