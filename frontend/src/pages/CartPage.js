import * as React from 'react';
import { useSelector } from 'react-redux';
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

function CartPage() {
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
      </Container>
    </>
  );
}

export default CartPage;
