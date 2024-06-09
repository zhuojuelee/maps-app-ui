import React, { useCallback } from 'react';
import DrawerComponent from '../drawer';
import { Stack, Typography } from '@mui/material';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

type FavouritePlacesDrawerProps = {

}

const FavouritePlacesDrawer: React.FC<FavouritePlacesDrawerProps> = (props) => {

  const renderDrawerIconText = useCallback(() => {
    return (
      <Stack alignItems='center' justifyContent='left' direction='row' gap={1} padding={2}>
        <StarBorderPurple500Icon sx={{ color: 'gold' }} />
        <Typography variant='body1'>Search History</Typography>
      </Stack>
    )
  }, []);

  const renderListItem = useCallback(() => {
    return null;
  }, [])

  return (
    <DrawerComponent
      anchor='right'
      isVisible={true}
      variant={'permanent'}
      drawerWidth={350}
      enableCustomDrawerControl={false}
      listData={[]}
      renderListItem={renderListItem}
      renderDrawerIconText={renderDrawerIconText}
    />
  )
}

export default React.memo(FavouritePlacesDrawer);
