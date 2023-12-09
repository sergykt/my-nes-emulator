import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import EmulatorPage from '@pages/EmulatorPage';
import StarterPage from '@pages/StarterPage';
import PageNotFound from '@pages/PageNotFound';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ScrollButton from '@components/ScrollButton';
import styles from './App.module.css';

const App: FC = () => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>
      <Routes>
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/' element={<StarterPage />} />
        <Route path='/emulator/*' element={<EmulatorPage />} />
      </Routes>
    </main>
    <Footer />
    <ScrollButton />
  </div>
);

export default App;
