import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MenuItem from '../components/MenuItem';
import Spinner from '../components/Spinner';
import { loadMenu } from '../store/menu';

function MenuPage() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuItems);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(loadMenu());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        {(loading)
          ? <Spinner />
          : menu.map((item) => <MenuItem item={item} key={item._id} />)}
      </Container>
    </>
  );
}

export default MenuPage;
