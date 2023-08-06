import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { RestaurantMenu, ReceiptLong } from '@mui/icons-material';
import CartIcon from './CartIcon';
import { drawerToggle } from '../store/ui';

function DrawerNav() {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.ui.drawerOpen);

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => dispatch(drawerToggle({
        drawerOpen: false,
      }))}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => dispatch(drawerToggle({
          drawerOpen: false,
        }))}
        onKeyDown={() => dispatch(drawerToggle({
          drawerOpen: false,
        }))}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/">
              <ListItemIcon>
                <RestaurantMenu />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/cart">
              <ListItemIcon>
                <CartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/orders">
              <ListItemIcon>
                <ReceiptLong />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default DrawerNav;
