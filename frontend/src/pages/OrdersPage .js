import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import OrderItem from '../components/OrderItem';
import Spinner from '../components/Spinner';
import { loadOrder } from '../store/order';
import { loadMenu } from '../store/menu';

function OrdersPage() {
  const dispatch = useDispatch();
  const { orderItems, loading } = useSelector((state) => state.order);
  const menuItems = useSelector((state) => state.menu.menuItems);

  useEffect(() => {
    if (!menuItems.length) dispatch(loadMenu());
    dispatch(loadOrder());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        {(loading)
          ? <Spinner />
          : orderItems.map((orderItem, index) => (
            <OrderItem
              orderItem={orderItem}
              key={orderItem._id}
              nr={index + 1}
            />
          ))}
        {(!orderItems.length && !loading)
          && <Alert severity="error" sx={{ my: 2 }}>Orders aren&apos;t available at the moment. Try again later.</Alert>}
      </Container>
    </>
  );
}

export default OrdersPage;
