import React from 'react';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import { getCartCount } from '../store/cart';

function CartIcon() {
  const cartCount = getCartCount(useSelector((state) => state.cart.items));

  return (
    <Badge badgeContent={cartCount} color="error">
      <ShoppingBasket />
    </Badge>
  );
}

export default CartIcon;
