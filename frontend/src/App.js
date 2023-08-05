import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage ';
import HeadBar from './components/HeadBar';
import DrawerNav from './components/DrawerNav';
import configureStore from './store/configureStore';

const store = configureStore();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <HeadBar />
        <DrawerNav />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
