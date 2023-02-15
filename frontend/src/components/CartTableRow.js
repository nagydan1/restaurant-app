import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function CartTableRow({ item }) {
  const [cartItem] = useSelector((state) => state.menu.menuItems.filter(
    (menuItem) => menuItem._id === item.menuItemId,
  ));

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {cartItem.name}
      </TableCell>
      <TableCell align="center">
        <ButtonGroup size="small">
          <Button key="one">
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
          <Button key="three">
            +
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell align="center">{`€ ${cartItem.price * item.quantity}`}</TableCell>
      <TableCell align="center">
        <Button size="small" color="error">Remove</Button>
      </TableCell>
    </TableRow>
  );
}

export default CartTableRow;
