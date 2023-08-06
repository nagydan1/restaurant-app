import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderCartItem from './OrderCartItem';
import { getMenuItemById } from '../store/menu';
import { deleteOrder } from '../store/order';
import * as utils from '../utils';

function OrderItem({ orderItem, nr }) {
  const dispatch = useDispatch();
  const orderQuantities = utils.getQuantitiesArray(orderItem.cart);
  const orderItemIds = utils.getMenuItemIdsArray(orderItem.cart);
  const orderItemPrices = orderItemIds.map(
    (id) => getMenuItemById(id)(useSelector((state) => state.menu))[0].price,
  );
  const totalPrice = utils.calculateTotalPrice(orderQuantities, orderItemPrices);

  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ pb: 1 }}>
            {`Order nr. ${nr}`}
          </Typography>
          <IconButton aria-label="delete" onClick={() => (dispatch(deleteOrder(orderItem._id)))}>
            <DeleteIcon />
          </IconButton>
        </Box>
        {orderItem.cart.map((cartItem) => (
          <OrderCartItem
            cartItem={cartItem}
            menuItem={getMenuItemById(cartItem.menuItemId)(useSelector((state) => state.menu))}
            key={cartItem._id}
          />
        ))}
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' },
        }}
        >
          <Typography sx={{ mb: 1.5, fontWeight: 'bold' }}>
            Total:
          </Typography>
          <Typography sx={{ mb: 1.5, fontWeight: 'bold', pl: 2 }}>
            {`${totalPrice.toFixed(2)} €`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default OrderItem;
