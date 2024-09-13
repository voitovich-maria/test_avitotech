import { OrderCard } from '@/entities';
import {
  ErrorMessage,
  GetOrdersListArgs,
  OrderStatus,
  OrderStatusRu,
  Preloader,
  useGetOrdersListQuery,
} from '@/shared';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TablePagination,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const OrdersPage = () => {
  const [sort, setSort] = useState<GetOrdersListArgs['sort']>();
  const [status, setStatus] = useState<GetOrdersListArgs['status']>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError, refetch } = useGetOrdersListQuery({
    sort,
    status,
    page,
    limit,
  });

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as GetOrdersListArgs['sort']);
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(
      event.target.value === undefined
        ? event.target.value
        : (Number(event.target.value) as GetOrdersListArgs['status']),
    );
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
          Заказы
        </Typography>

        <Toolbar disableGutters sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          <FormControl fullWidth size='small' sx={{ minWidth: '240px', mr: { sm: '24px' }, mb: { xs: '24px', sm: 0 } }}>
            <InputLabel>Сортировать по:</InputLabel>
            <Select label='Сортировать по:' onChange={handleChangeSort}>
              <MenuItem>не сортировать</MenuItem>
              <MenuItem value='asd'>↑ возрастанию стоимости</MenuItem>
              <MenuItem value='desc'>↓ убыванию стоимости</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size='small' sx={{ minWidth: '240px' }}>
            <InputLabel>Статус:</InputLabel>
            <Select label='Статус:' onChange={handleChangeStatus}>
              <MenuItem>не фильтровать</MenuItem>
              {Object.values(OrderStatus).map((item) => (
                <MenuItem value={item} key={item}>
                  {OrderStatusRu[item]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              <Stack spacing={{ xs: 2, sm: 3 }}>
                {data.map((item) => (
                  <OrderCard key={item.id} {...item} />
                ))}
              </Stack>
            ) : (
              <ErrorMessage title='Нет данных' text='К сожалению, по вашему запросу ничего не найдено' />
            )}
          </>
        )}

        {isLoading && <Preloader />}
        {isError && <ErrorMessage onClick={refetch} />}
      </Container>
    </Box>
  );
};

export default OrdersPage;
