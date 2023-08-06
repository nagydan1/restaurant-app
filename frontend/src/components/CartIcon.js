import React from 'react';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';

function CartIcon() {
  const cartCount = useSelector((state) => state.cart.items
    .map((cartItem) => cartItem.quantity))
    .reduce((a, b) => a + b, 0);

  return (
    <Badge badgeContent={cartCount} color="error">
      <ShoppingBasket />
    </Badge>
  );
}

export default CartIcon;
