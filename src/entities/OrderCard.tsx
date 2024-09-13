import { formatPrice, Order, OrderStatusRu, PATHS } from '@/shared';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Chip, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { generatePath, Link as RouterLink } from 'react-router-dom';

export const OrderCard = ({ id, status, createdAt, finishedAt, items, total }: Order) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          flexWrap='wrap'
          width='95%'
          minHeight='80px'
          sx={{ '& > *:not(:last-child)': { mr: '24px' } }}
        >
          <Typography variant='h6'>Заказ №{id}</Typography>
          <Typography variant='body1'>{formatPrice(total)}</Typography>
          <Typography variant='body1'>Товаров: {items.length}</Typography>

          <Box>
            <Typography variant='body2' color='grey.500'>
              Создан: {format(parseISO(createdAt), 'dd.MM.yyyy HH:mm:ss')}
            </Typography>
            {finishedAt && (
              <Typography variant='body2' color='grey.500'>
                Завершен: {format(parseISO(finishedAt), 'dd.MM.yyyy HH:mm:ss')}
              </Typography>
            )}
          </Box>
          <Chip label={OrderStatusRu[status]} />
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        {items.map((item) => (
          <Box display='flex' alignItems='center' flexWrap='wrap' sx={{ '& > *:not(:last-child)': { mr: '24px' } }}>
            <Link
              component={RouterLink}
              to={generatePath(PATHS.advertisements.details, { id: item.id })}
              underline='hover'
            >
              {item.name}
            </Link>
            <Typography variant='body1'>({item.count})</Typography>
            <Typography variant='body1'>{formatPrice(item.price)}</Typography>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
