import { IconType } from 'react-icons';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { AlertType } from '@/types';

const icons: Record<AlertType, IconType> = {
  [AlertType.MUTE]: RiVolumeMuteFill as IconType,
  [AlertType.UNMUTE]: RiVolumeUpFill as IconType,
};

export default icons;
