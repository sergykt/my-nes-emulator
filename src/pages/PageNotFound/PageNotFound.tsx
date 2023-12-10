import type { FC } from 'react';
import PageLayout from '@src/components/PageLayout';
import Container from '@components/Container';
import styles from './PageNotFound.module.scss';

const PageNotFound: FC = () => (
  <PageLayout>
    <div className={styles.pageNotFound}>
      <Container className={styles.container}>
        <h1 className={styles.title}>GAME OVER</h1>
        <h2 className={styles.subtitle}>Page not found</h2>
        <div className={styles.imgBody}>
          <img
            src='/img/avgn-duckhunt.gif'
            className={styles.img}
            alt='avgn'
            width={300}
            height={225}
          />
        </div>
      </Container>
    </div>
  </PageLayout>
);

export default PageNotFound;
