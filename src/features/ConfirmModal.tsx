import { useDeleteAdvertisementMutation } from '@/shared';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  id?: string;
  isOpen: boolean;
  handleClose: () => void;
};

export const ConfirmModal = ({ id, isOpen, handleClose }: Props) => {
  const [statusMessage, setStatusMessage] = useState<'success' | 'error' | ''>('');
  const [deleteAdvertisement, { isSuccess, isError }] = useDeleteAdvertisementMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setStatusMessage('success');
      handleClose();
      navigate('/');
    }

    if (isError) {
      setStatusMessage('error');
    }
  }, [isSuccess, isError]);

  const onDelete = () => {
    deleteAdvertisement(id ?? '');
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Удалить</DialogTitle>
        <DialogContent>
          <DialogContentText>Вы уверены, что хотите удалить объявление?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Отмена
          </Button>
          <Button variant='contained' onClick={onDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!statusMessage}
        autoHideDuration={6000}
        onClose={() => setStatusMessage('')}
      >
        <Alert onClose={() => setStatusMessage('')} severity={statusMessage || 'success'}>
          {statusMessage === 'success' && 'Объявление успешно удалено!'}
          {statusMessage === 'error' && 'Ошибка! Попробуйте повторить запрос позже'}
        </Alert>
      </Snackbar>
    </>
  );
};
