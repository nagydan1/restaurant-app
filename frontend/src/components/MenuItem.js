import React from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { itemAdded } from '../store/cart';

function MenuItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2">
          €
          {item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => dispatch(itemAdded({
            menuItemId: item._id,
          }))}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default MenuItem;
