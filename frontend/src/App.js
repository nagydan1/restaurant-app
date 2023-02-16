import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import HeadBar from './components/HeadBar';
import configureStore from './store/configureStore';

const store = configureStore();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <HeadBar />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
