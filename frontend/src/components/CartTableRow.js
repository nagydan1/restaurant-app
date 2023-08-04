import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { quantityIncremented, quantityDecremented, itemRemoved } from '../store/cart';

function CartTableRow({ item }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.menu.menuItems)
    .find((menuItem) => menuItem._id === item.menuItemId);
  const subTotalPrice = cartItem.price * item.quantity;

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'grey.300',
      }}
    >
      <TableCell component="th" scope="row" sx={{ minWidth: 270, border: 0, lineHeight: 2.2 }}>
        {cartItem.name}
      </TableCell>
      <TableCell align="center" sx={{ flexShrink: 1, minWidth: 120, border: 0 }}>
        <ButtonGroup size="small">
          <Button
            key="one"
            onClick={() => dispatch(quantityDecremented({
              menuItemId: cartItem._id,
            }))}
          >
            -
          </Button>
          <Button
            key="two"
            sx={{
              '&.Mui-disabled': {
                borderColor: '#8cbae8',
                color: '#000000',
              },
            }}
            disabled
          >
            {item.quantity}
          </Button>
          <Button
            key="three"
            onClick={() => dispatch(quantityIncremented({
              menuItemId: cartItem._id,
            }))}
          >
            +
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          flexGrow: 1, minWidth: 120, border: 0, lineHeight: 2.2,
        }}
      >
        {`${subTotalPrice.toFixed(2)} €`}
      </TableCell>
      <TableCell align="center" sx={{ flexGrow: 1, minWidth: 120, border: 0 }}>
        <Button
          size="small"
          color="error"
          onClick={() => dispatch(itemRemoved({
            menuItemId: cartItem._id,
          }))}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default CartTableRow;
