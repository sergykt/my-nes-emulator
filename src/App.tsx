import { type FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Preloader from '@components/Preloader';

const PageNotFound = lazy(() => import('@pages/PageNotFound'));
const StarterPage = lazy(() => import('@pages/StarterPage'));
const EmulatorPage = lazy(() => import('@pages/EmulatorPage'));

const App: FC = () => (
  <Suspense fallback={<Preloader />}>
    <Routes>
      <Route path='/*' element={<PageNotFound />} />
      <Route path='/' element={<StarterPage />} />
      <Route path='/emulator/*' element={<EmulatorPage />} />
    </Routes>
  </Suspense>
);

export default App;
