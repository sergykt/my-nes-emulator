import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.spinner}>
      <p className={styles.title}>Loading...</p>
      <div className={styles.spinnerItem} />
    </div>
  );
};

export default Preloader;
