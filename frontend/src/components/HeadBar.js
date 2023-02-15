import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TapasIcon from '@mui/icons-material/Tapas';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function HeadBar() {
  let cartCount = 0;
  const cartCountArray = useSelector((state) => state.cart.map((cartItem) => cartItem.quantity));
  if (cartCountArray.length !== 0) {
    cartCount = cartCountArray.reduce((a, b) => a + b);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <TapasIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            San Telmo Tavern
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            component={NavLink}
            to="/cart"
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeadBar;
