import type { FC, ComponentProps } from 'react';
import { useAppSelector } from '@src/hooks';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ScrollButton from '@components/ScrollButton';
import GameList from '../GameList';
import styles from './PageLayout.module.scss';

type PageLayoutProps = ComponentProps<'div'>;

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const { isActive } = useAppSelector((state) => state.searchBar);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
      <ScrollButton />
      {isActive && <GameList />}
    </div>
  );
};

export default PageLayout;
