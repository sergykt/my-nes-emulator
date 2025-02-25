import { memo } from 'react';
import FancyLink from '@/components/FancyLink';
import Container from '@/components/Container';
import styles from './Footer.module.scss';

const Footer = memo(() => (
  <footer className={styles.footer}>
    <Container>
      <p className={styles.engine}>
        <FancyLink href='https://github.com/bfirsh/jsnes' target='_blank'>
          NES engine by jsnes
        </FancyLink>
      </p>
      <p className={styles.copyright}>© 2023 Created by Sergei Sivtsev</p>
    </Container>
  </footer>
));

export default Footer;
