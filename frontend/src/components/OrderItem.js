import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OrderCartItem from './OrderCartItem';
import { getMenuItemById } from '../store/menu';

function OrderItem({ orderItem, nr }) {
  const orderQuantities = orderItem.cart.map((cartItem) => cartItem.quantity);
  const orderItemIds = orderItem.cart.map((cartItem) => cartItem.menuItemId);
  const orderItemPrices = orderItemIds.map(
    (id) => getMenuItemById(id)(useSelector((state) => state.menu))[0].price,
  );
  const totalPrice = orderQuantities
    .map((quantity, index) => quantity * orderItemPrices[index])
    .reduce((a, b) => a + b, 0);

  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ pb: 1 }}>
          {`Order nr. ${nr}`}
        </Typography>
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
