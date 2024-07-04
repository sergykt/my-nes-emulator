import { memo, type FC } from 'react';
import { AlertType } from '@/types';
import icons from './icons';
import styles from './Alert.module.scss';

interface IAlertProps {
  type: AlertType | null;
}

const Alert: FC<IAlertProps> = memo((props) => {
  const { type } = props;

  if (!type) {
    return null;
  }

  const Icon = icons[type];

  return <Icon className={styles.icon} />;
});

export default Alert;
