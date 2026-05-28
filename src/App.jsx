import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import Book from './pages/Book';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
