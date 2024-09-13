import { Advertisement, formatPrice, PATHS } from '@/shared';
import { ImageNotSupported, Favorite, Visibility } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';

export const AdvertisementCard = ({ id, name, price, views, likes, imageUrl }: Advertisement) => {
  const navigate = useNavigate();
  const detailsPath = generatePath(PATHS.advertisements.details, { id });

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardActionArea sx={{ display: 'flex', height: '200px' }} onClick={() => navigate(detailsPath)}>
          {imageUrl ? (
            <Box component='img' src={imageUrl} alt={name} width='200px' height='200px' sx={{ objectFit: 'cover' }} />
          ) : (
            <ImageNotSupported sx={{ fontSize: '200px', color: 'grey.500' }} />
          )}

          <CardContent sx={{ flex: '1' }}>
            <Typography variant='h6' mb='12px'>
              {name}
            </Typography>
            <Typography variant='body1'>{formatPrice(price)}</Typography>

            <Box mt='24px' display='flex' color='grey.500'>
              <Box mr='24px' display='flex' alignItems='center'>
                <Favorite />
                <Typography variant='body2' ml='8px'>
                  {likes}
                </Typography>
              </Box>

              <Box display='flex' alignItems='center'>
                <Visibility />
                <Typography variant='body2' ml='8px'>
                  {views}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
