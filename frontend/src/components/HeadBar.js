import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import TapasIcon from '@mui/icons-material/Tapas';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function HeadBar() {
  const cartCount = useSelector((state) => state.cart.items
    .map((cartItem) => cartItem.quantity))
    .reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
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
