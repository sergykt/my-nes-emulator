import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <p className={styles.loadingText}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </p>
    </div>
  );
};

export default Preloader;
