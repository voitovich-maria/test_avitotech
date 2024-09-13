import { AdvertisementCard } from '@/entities';
import { FormModal } from '@/features';
import { ErrorMessage, Preloader, useDebounce, useGetAdvertisementsListQuery } from '@/shared';
import { Clear } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const AdvertisementsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchByName, setSearchByName] = useState('');
  const debouncedSearchByName = useDebounce(searchByName, 300);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError, refetch } = useGetAdvertisementsListQuery({
    searchByName: debouncedSearchByName,
    page,
    limit,
  });

  const handleClearSearch = () => {
    setSearchByName('');
  };

  const handleChangePage = (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Box component='main' py={{ xs: '16px', sm: '24px' }}>
      <Container>
        <Typography variant='h4' mb='24px'>
          Объявления
        </Typography>

        <Toolbar disableGutters>
          <Button
            variant='contained'
            sx={{ mr: '24px', minWidth: { xs: '100px', sm: '200px' }, height: '40px' }}
            onClick={() => setIsModalOpen(true)}
          >
            Новое
            <Box component='span' display={{ xs: 'none', sm: 'inline' }}>
              &nbsp;объявление
            </Box>
          </Button>

          <TextField
            variant='outlined'
            size='small'
            fullWidth
            placeholder='Поиск по названию'
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClearSearch}
                    edge='end'
                    style={{ visibility: searchByName ? 'visible' : 'hidden' }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>

        {data && (
          <>
            <TablePagination
              component='div'
              labelRowsPerPage='Показывать по:'
              labelDisplayedRows={({ from, to }) => `${from}–${to}`}
              count={data.length < limit ? (page - 1) * limit + data.length : -1}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeLimit}
            />

            {data.length !== 0 ? (
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {data.map((item) => (
                  <AdvertisementCard key={item.id} {...item} />
                ))}
              </Grid>
            ) : (
              <ErrorMessage title='Нет данных' text='К сожалению, по вашему запросу ничего не найдено' />
            )}
          </>
        )}

        {isLoading && <Preloader />}
        {isError && <ErrorMessage onClick={refetch} />}
      </Container>

      <FormModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </Box>
  );
};

export default AdvertisementsPage;
