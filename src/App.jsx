import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteContentProvider } from './context/SiteContentProvider';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import Book from './pages/Book';
import Studio from './pages/Studio';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

export default function App() {
  return (
    <SiteContentProvider>
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/studio/*" element={<Studio />} />
        </Routes>
      </BrowserRouter>
    </SiteContentProvider>
  );
}
