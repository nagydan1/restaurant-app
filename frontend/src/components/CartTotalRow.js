import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function CartTotalRow({ cart }) {
  const menu = useSelector((state) => state.menu.menuItems);
  const cartItemIds = cart.map((cartItem) => cartItem.menuItemId);
  const cartItemQuantities = cart.map((cartItem) => cartItem.quantity);
  const cartItemPrices = cartItemIds.map((id) => menu.find((item) => item._id === id).price);

  const totalQuantity = cartItemQuantities.reduce((a, b) => a + b, 0);
  const totalPrice = cartItemQuantities
    .map((quantity, index) => quantity * cartItemPrices[index])
    .reduce((a, b) => a + b, 0);

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Total</TableCell>
      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{totalQuantity}</TableCell>
      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{`€ ${totalPrice}`}</TableCell>
      <TableCell align="center">
        <Button size="small" color="error">Remove all</Button>
      </TableCell>
    </TableRow>
  );
}

export default CartTotalRow;
