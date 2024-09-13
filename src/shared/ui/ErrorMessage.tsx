import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type Props = {
  title?: string;
  text?: string;
  onClick?: () => void;
};

export const ErrorMessage = ({ title = 'Ошибка', text = 'Ошибка загрузки данных', onClick }: Props) => {
  return (
    <Box my='48px' textAlign='center'>
      <ErrorOutlineIcon sx={{ fontSize: '96px', color: 'error.main' }} />
      <Typography variant='h4' mb='12px'>
        {title}
      </Typography>
      <Typography variant='body1' mb='24px'>
        {text}
      </Typography>
      {onClick && <Button onClick={onClick}>Попробовать еще раз</Button>}
    </Box>
  );
};
