import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function OrderCartItem({ cartItem, menuItem }) {
  const subTotalPrice = cartItem.quantity * menuItem[0].price;

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' },
    }}
    >
      <Typography sx={{ mb: 1.5 }}>
        {`${menuItem[0].name}:`}
      </Typography>
      <Typography sx={{ mb: 1.5, pl: 2 }} color="text.secondary">
        {`${cartItem.quantity} x ${menuItem[0].price.toFixed(2)} € = ${subTotalPrice.toFixed(2)} €`}
      </Typography>
    </Box>
  );
}

export default OrderCartItem;
