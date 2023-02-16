import * as React from 'react';
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
import { sendOrder } from '../store/cart';

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
              {cart.map((item) => (
                <CartTableRow item={item} key={item.menuItemId} />
              ))}
              <CartTotalRow cart={cart} />
            </TableBody>
          </Table>
        </TableContainer>
        <Button
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
          BACK TO MENU
        </Button>
      </Container>
    </>
  );
}

export default CartPage;
