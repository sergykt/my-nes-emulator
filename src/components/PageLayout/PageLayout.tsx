import { type FC, type ComponentProps, memo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollButton from '@/components/ScrollButton';
import styles from './PageLayout.module.scss';

type PageLayoutProps = ComponentProps<'div'>;

const PageLayout: FC<PageLayoutProps> = memo(({ children }) => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
    <ScrollButton />
  </div>
));

export default PageLayout;
