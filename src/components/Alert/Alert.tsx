import { memo } from 'react';
import { useEmulatorStore } from '@/store';
import icons from './icons';
import styles from './Alert.module.scss';

const Alert = memo(() => {
  const type = useEmulatorStore((state) => state.alertType);

  if (!type) {
    return null;
  }

  const Icon = icons[type];

  return <Icon className={styles.icon} />;
});

export default Alert;
