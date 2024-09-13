import { Box, CircularProgress } from '@mui/material';

export const Preloader = () => {
  return (
    <Box my='48px' textAlign='center'>
      <CircularProgress />
    </Box>
  );
};
