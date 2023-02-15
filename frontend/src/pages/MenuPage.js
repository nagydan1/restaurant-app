import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { loadMenu } from '../store/menu';

function MenuPage() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuItems);

  useEffect(() => {
    dispatch(loadMenu());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        {menu.map((item) => (
          <Card sx={{ minWidth: 275, my: 2 }} key={item._id}>
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
              <Button size="small">Add to cart</Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default MenuPage;
