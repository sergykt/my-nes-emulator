import type { FC } from 'react';
import Container from '@components/Container';
import styles from './PageNotFound.module.scss';

const PageNotFound: FC = () => (
  <div className={styles.pageNotFound}>
    <Container className={styles.container}>
      <h1 className={styles.title}>GAME OVER</h1>
      <h2 className={styles.subtitle}>Page not found</h2>
    </Container>
  </div>
);

export default PageNotFound;
