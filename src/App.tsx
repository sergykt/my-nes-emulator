import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StarterPage from './pages/StarterPage';
import EmulatorPage from './pages/EmulatorPage';
import PageNotFound from './pages/PageNotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<StarterPage />} />
      <Route path='/emulator/:id' element={<EmulatorPage />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
