import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import MenuItem from '../components/MenuItem';
import Spinner from '../components/Spinner';
import { loadMenu } from '../store/menu';

function MenuPage() {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.menuItems);
  const loading = useSelector((state) => state.menu.loading);

  useEffect(() => {
    dispatch(loadMenu());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ pt: 8 }}>
        {(loading)
          ? <Spinner />
          : menuItems.map((item) => <MenuItem item={item} key={item._id} />)}
        {(!menuItems.length && !loading)
          && <Alert severity="error" sx={{ my: 2 }}>The menu isn&apos;t available at the moment. Try again later.</Alert>}
      </Container>
    </>
  );
}

export default MenuPage;
