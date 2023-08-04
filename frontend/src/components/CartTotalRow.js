import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { allItemsRemoved } from '../store/cart';

function CartTotalRow({ items }) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menuItems);
  const cartItemIds = items.map((cartItem) => cartItem.menuItemId);
  const cartItemQuantities = items.map((cartItem) => cartItem.quantity);
  const cartItemPrices = cartItemIds.map((id) => menu.find((item) => item._id === id).price);

  const totalQuantity = cartItemQuantities.reduce((a, b) => a + b, 0);
  const totalPrice = cartItemQuantities
    .map((quantity, index) => quantity * cartItemPrices[index])
    .reduce((a, b) => a + b, 0);

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', minWidth: 270 }}>Total</TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: 'bold', flexShrink: 1, minWidth: 120, px: 6,
        }}
      >
        {
          (totalQuantity < 2) ? `${totalQuantity} item` : `${totalQuantity} items`
        }
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: 'bold', flexGrow: 1, minWidth: 120,
        }}
      >
        {`${totalPrice.toFixed(2)} €`}
      </TableCell>
      <TableCell align="center" sx={{ flexGrow: 1, minWidth: 120 }}>
        <Button
          size="small"
          color="error"
          onClick={() => dispatch(allItemsRemoved())}
        >
          Remove all
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default CartTotalRow;
