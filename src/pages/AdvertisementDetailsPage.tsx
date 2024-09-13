import { ConfirmModal, FormModal } from '@/features';
import { ErrorMessage, formatPrice, Preloader, useGetAdvertisementDetailsQuery } from '@/shared';
import { Favorite, ImageNotSupported, Visibility } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const AdvertisementDetailsPage = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetAdvertisementDetailsQuery(id);

  return (
    <Box component='main' py={{ xs: '32px', sm: '48px' }}>
      <Container>
        {data && (
          <Box display='flex' flexDirection={{ xs: 'column-reverse', md: 'row' }}>
            {data.imageUrl ? (
              <Box
                component='img'
                src={data.imageUrl}
                alt={data.name}
                mr='48px'
                width='400px'
                height='400px'
                sx={{ objectFit: 'cover' }}
              />
            ) : (
              <ImageNotSupported sx={{ fontSize: '400px', color: 'grey.500' }} />
            )}

            <Box>
              <Box mb='24px' sx={{ '& > *:not(:last-child)': { mr: '24px' } }}>
                <Button variant='contained' onClick={() => setIsFormModalOpen(true)}>
                  Редактировать
                </Button>
                <Button variant='outlined' onClick={() => setIsConfirmModalOpen(true)}>
                  Удалить
                </Button>
              </Box>

              <Typography variant='h4' mb='24px'>
                {data.name}
              </Typography>

              <Typography variant='h6'>{formatPrice(data.price)}</Typography>

              <Box my='24px' display='flex' color='grey.500'>
                <Box mr='24px' display='flex' alignItems='center'>
                  <Favorite />
                  <Typography variant='body2' ml='8px'>
                    {data.likes}
                  </Typography>
                </Box>

                <Box display='flex' alignItems='center'>
                  <Visibility />
                  <Typography variant='body2' ml='8px'>
                    {data.views}
                  </Typography>
                </Box>
              </Box>

              <Typography variant='body2' color='grey.500' mb='24px'>
                {format(parseISO(data.createdAt), 'dd.MM.yyyy HH:mm:ss')}
              </Typography>

              <Typography variant='body1' mb='24px'>
                {data.description}
              </Typography>
            </Box>
          </Box>
        )}

        {isLoading && <Preloader />}
        {isError && <ErrorMessage onClick={refetch} />}
      </Container>

      {data && (
        <FormModal
          defaultValues={data ? { ...data } : undefined}
          isOpen={isFormModalOpen}
          handleClose={() => setIsFormModalOpen(false)}
        />
      )}
      <ConfirmModal id={id} isOpen={isConfirmModalOpen} handleClose={() => setIsConfirmModalOpen(false)} />
    </Box>
  );
};

export default AdvertisementDetailsPage;
