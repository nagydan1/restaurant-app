import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function CartTotalRow({ cart }) {
  let totalQuantity = 0;
  const cartItemQuantities = cart.map((cartItem) => cartItem.quantity);
  if (cartItemQuantities.length !== 0) {
    totalQuantity = cartItemQuantities.reduce((a, b) => a + b);
  }

  const cartItemIds = cart.map((cartItem) => cartItem.menuItemId);
  const menu = useSelector((state) => state.menu.menuItems);
  const cartItemPrices = [];
  cartItemIds.forEach((id) => {
    const [menuItem] = menu.filter((item) => item._id === id);
    cartItemPrices.push(menuItem.price);
  });

  const cartPrices = [];
  let totalPrice = 0;
  for (let i = 0; i < cartItemQuantities.length; i += 1) {
    console.log(cartItemPrices);
    console.log(cartItemQuantities);
    cartPrices.push(cartItemQuantities[i] * cartItemPrices[i]);
  }
  if (cartItemPrices.length !== 0) {
    totalPrice = cartPrices.reduce((a, b) => a + b);
  }

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
