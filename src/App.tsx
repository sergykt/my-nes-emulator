import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import EmulatorPage from '@pages/EmulatorPage';
import StarterPage from '@pages/StarterPage';
import PageNotFound from '@pages/PageNotFound';

const App: FC = () => (
  <Routes>
    <Route path='/*' element={<PageNotFound />} />
    <Route path='/' element={<StarterPage />} />
    <Route path='/emulator/*' element={<EmulatorPage />} />
  </Routes>
);

export default App;
