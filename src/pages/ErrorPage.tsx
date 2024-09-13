import { Container, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Container sx={{ my: '48px', textAlign: 'center' }}>
      <ErrorOutlineIcon sx={{ fontSize: '96px', color: 'error.main' }} />
      <Typography variant='h4' mb='12px'>
        Ошибка
      </Typography>
      <Typography variant='body1' mb='24px'>
        Что-то пошло не так...
      </Typography>
      <Button component={Link} to='/'>
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default ErrorPage;
