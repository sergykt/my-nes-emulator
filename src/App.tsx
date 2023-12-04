import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmulatorPage from '@pages/EmulatorPage';
import StarterPage from '@pages/StarterPage';
import PageNotFound from '@pages/PageNotFound';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ScrollButton from '@components/ScrollButton';

const App: FC = () => (
  <BrowserRouter>
    <div className='wrapper'>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/*' element={<PageNotFound />} />
          <Route path='/' element={<StarterPage />} />
          <Route path='/emulator/*' element={<EmulatorPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollButton />
    </div>
  </BrowserRouter>
);

export default App;
