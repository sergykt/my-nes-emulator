import { type FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const PageNotFound = lazy(() => import('@pages/PageNotFound'));
const StarterPage = lazy(() => import('@pages/StarterPage'));
const EmulatorPage = lazy(() => import('@pages/EmulatorPage'));

const App: FC = () => (
  <Routes>
    <Suspense fallback={<div>Loading...</div>}>
      <Route path='/*' element={<PageNotFound />} />
      <Route path='/' element={<StarterPage />} />
      <Route path='/emulator/*' element={<EmulatorPage />} />
    </Suspense>
  </Routes>
);

export default App;
