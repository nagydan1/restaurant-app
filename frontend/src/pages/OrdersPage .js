import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import OrderItem from '../components/OrderItem';
import Spinner from '../components/Spinner';
import FeedbackBar from '../components/FeedbackBar';
import { loadOrder, resetFeedback } from '../store/order';
import { loadMenu } from '../store/menu';

function OrdersPage() {
  const dispatch = useDispatch();
  const {
    orderItems, loading, feedback, lastFetch,
  } = useSelector((state) => state.order);
  const isMenuFetched = useSelector((state) => state.menu.lastFetch);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    if (!isMenuFetched) dispatch(loadMenu());
    dispatch(loadOrder());
  }, []);

  useEffect(() => {
    if (Object.keys(feedback).length) setFeedbackOpen(true);
  }, [feedback]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setFeedbackOpen(false);
    setTimeout(() => dispatch(resetFeedback()), 1000);
  };

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
          && (
          <Alert severity="error" sx={{ my: 2 }}>
            {(lastFetch) ? 'There isn\'t any saved order.' : 'The server is unavailable at the moment. Try again later.'}
          </Alert>
          )}
      </Container>
      <FeedbackBar
        open={feedbackOpen}
        severity={feedback.severity}
        message={feedback.message}
        handleClose={handleClose}
      />
    </>
  );
}

export default OrdersPage;
