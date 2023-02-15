import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MenuItem from '../components/MenuItem';
import Spinner from '../components/Spinner';
import { loadMenu } from '../store/menu';

function MenuPage() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menuItems);
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
          : menu.map((item) => <MenuItem item={item} key={item._id} />)}
      </Container>
    </>
  );
}

export default MenuPage;
