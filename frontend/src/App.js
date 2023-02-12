import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import HeadBar from './components/HeadBar';

function App() {
  return (
    <BrowserRouter>
      <HeadBar />
      <Routes>
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
