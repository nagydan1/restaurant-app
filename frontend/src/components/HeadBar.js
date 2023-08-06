import * as React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TapasIcon from '@mui/icons-material/Tapas';
import MenuIcon from '@mui/icons-material/Menu';
import CartIcon from './CartIcon';
import { drawerToggle } from '../store/ui';

function HeadBar() {
  const dispatch = useDispatch();

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
            onClick={() => dispatch(drawerToggle({
              drawerOpen: true,
            }))}
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
            <CartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeadBar;
