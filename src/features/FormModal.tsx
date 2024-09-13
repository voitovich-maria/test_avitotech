import { AdvertisementFormData, useCreateAdvertisementMutation, useEditAdvertisementMutation } from '@/shared';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  defaultValues?: AdvertisementFormData & { id: string };
  isOpen: boolean;
  handleClose: () => void;
};

export const FormModal = ({ defaultValues, isOpen, handleClose }: Props) => {
  const [statusMessage, setStatusMessage] = useState<'success' | 'error' | ''>('');
  const [createAdvertisement, { isSuccess: isCreateSuccess, isError: isCreateError }] =
    useCreateAdvertisementMutation();
  const [editAdvertisement, { isSuccess: isEditSuccees, isError: isEditError }] = useEditAdvertisementMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AdvertisementFormData>({
    mode: 'onChange',
    defaultValues: {
      name: defaultValues?.name,
      price: defaultValues?.price,
      imageUrl: defaultValues?.imageUrl,
      description: defaultValues?.description,
    },
  });

  useEffect(() => {
    if (isCreateSuccess || isEditSuccees) {
      setStatusMessage('success');
      onCancel();
    }

    if (isCreateError || isEditError) {
      setStatusMessage('error');
    }
  }, [isCreateSuccess, isEditSuccees, isCreateError, isEditError]);

  const onCancel = () => {
    reset();
    handleClose();
  };

  const onSubmit = (formData: AdvertisementFormData) => {
    if (defaultValues) {
      editAdvertisement({ id: defaultValues.id, data: formData });
    } else {
      createAdvertisement({
        ...formData,
        id: nanoid(),
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        views: 0,
        likes: 0,
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{defaultValues ? 'Редактировать' : 'Создать'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('name', { required: 'Обязательное поле' })}
              label='Название'
              fullWidth
              margin='normal'
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
            <TextField
              {...register('price', {
                required: 'Обязательное поле',
                valueAsNumber: true,
                min: { value: 0, message: 'Стоимость должна быть положительной' },
              })}
              label='Стоимость'
              type='number'
              fullWidth
              margin='normal'
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ''}
            />
            <TextField
              {...register('imageUrl')}
              label='URL изображения'
              fullWidth
              margin='normal'
              error={!!errors.imageUrl}
              helperText={errors.imageUrl ? errors.imageUrl.message : ''}
            />
            <TextField {...register('description')} label='Описание' fullWidth margin='normal' multiline rows={4} />
            <DialogActions>
              <Button variant='outlined' onClick={onCancel} sx={{ mr: '8px' }}>
                Отмена
              </Button>
              <Button variant='contained' type='submit' disabled={!isValid}>
                {defaultValues ? 'Редактировать' : 'Создать'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!statusMessage}
        autoHideDuration={6000}
        onClose={() => setStatusMessage('')}
      >
        <Alert onClose={() => setStatusMessage('')} severity={statusMessage || 'success'}>
          {statusMessage === 'success' && `Объявление успешно ${isCreateSuccess ? 'создано' : 'обновлено'}!`}
          {statusMessage === 'error' && 'Ошибка! Попробуйте повторить запрос позже'}
        </Alert>
      </Snackbar>
    </>
  );
};
