import { type FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const PageNotFound = lazy(() => import('@pages/PageNotFound'));
const StarterPage = lazy(() => import('@pages/StarterPage'));
const EmulatorPage = lazy(() => import('@pages/EmulatorPage'));

const App: FC = () => (
  <Routes>
    <Route path='/*' element={<PageNotFound />} />
    <Route path='/' element={<StarterPage />} />
    <Route path='/emulator/*' element={<EmulatorPage />} />
  </Routes>
);

export default App;
