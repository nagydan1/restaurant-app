import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CartTableRow from '../components/CartTableRow';
import CartTotalRow from '../components/CartTotalRow';
import FeedbackBar from '../components/FeedbackBar';
import { resetFeedback, sendOrder } from '../store/cart';

function CartPage() {
  const dispatch = useDispatch();
  const { items, feedback } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(feedback).length) setOpen(true);
  }, [feedback]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    setTimeout(() => dispatch(resetFeedback()), 1000);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ pt: 8 }}>
        <TableContainer component={Paper} sx={{ my: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Plate</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <CartTableRow item={item} key={item.menuItemId} />
              ))}
              <CartTotalRow items={items} />
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          disabled={!items.length}
          size="large"
          onClick={() => dispatch(sendOrder())}
        >
          Send order
        </Button>
        <Button
          size="large"
          color="error"
          component={NavLink}
          to="/"
        >
          Back to menu
        </Button>
      </Container>
      <FeedbackBar
        open={open}
        severity={feedback.severity}
        message={feedback.message}
        handleClose={handleClose}
      />
    </>
  );
}

export default CartPage;
