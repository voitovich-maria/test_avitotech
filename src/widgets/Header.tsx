import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { Logo } from '@/shared';
import { Link } from 'react-router-dom';
import { PATHS } from '@/shared/consts';

export const Header = () => {
  return (
    <AppBar position='static' sx={{ backgroundColor: 'background.default' }}>
      <Container>
        <Toolbar disableGutters sx={{ py: { xs: '16px', sm: '24px' } }}>
          <Logo sx={{ mr: '24px', fontSize: 48 }} />
          <Box component='nav' ml='auto' sx={{ '& > *:not(:last-child)': { mr: '24px' } }}>
            <Button component={Link} to={PATHS.advertisements.list}>
              Объявления
            </Button>
            <Button component={Link} to={PATHS.orders}>
              Заказы
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
