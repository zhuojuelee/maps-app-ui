import React, { useCallback, useEffect, useState } from 'react';
import DrawerComponent from '../drawer';
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { fetchFavouritesThunk, getFavouritesDataSlice } from '../../reducers/favourites';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FavouritePlaceItem, FavouritesPlaceList } from '../../types/types-public';
import CancelIcon from '@mui/icons-material/Cancel';
import { setSelectedPlace } from '../../reducers/place';
import { FavouritesClient } from '../../lib/favourites-client';

type FavouritePlacesDrawerProps = {}

type MapDispatchToProps = { setSelectedPlace: (payload: { lat: number; long: number }) => void; }

type ComponentProps = FavouritePlacesDrawerProps & MapDispatchToProps;

const mapDispatchToProps = { setSelectedPlace }

const TemperatureModalComponent = (props) => {
  const { temp, openModal, onClose, place } = props;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openModal}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          The current temperature in {place} is {temp}c
        </Typography>
      </Box>
    </Modal>
  )
}

const FavouritePlacesDrawer: React.FC<ComponentProps> = (props) => {
  const [dataList, setDataList] = useState<FavouritesPlaceList>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tempPlace, setTempPlace] = useState('');
  const [temp, setTemp] = useState('');
  const dataStatus = useSelector(getFavouritesDataSlice);
  const { loading, data, error } = dataStatus;
  const dispatch = useDispatch();
  const { setSelectedPlace } = props;

  const renderDrawerIconText = useCallback(() => {
    return (
      <Stack alignItems='center' justifyContent='left' direction='row' gap={1} padding={2}>
        <StarBorderPurple500Icon sx={{ color: 'gold' }} />
        <Typography variant='body1'>Favourites</Typography>
      </Stack>
    );
  }, []);

  const renderOnEmptyList = useCallback(() => {
    if (error) {
      return (<Typography sx={{ padding: 2 }}>Error loading favourites</Typography>);
    }

    if (data.length === 0 && loading) {
      return (<Typography sx={{ padding: 2 }}>Loading favourites list</Typography>);
    }

    if (!loading && data.length === 0) {
      return (<Typography sx={{ padding: 2 }}>Add some favourites!</Typography>);
    }

    return null;
  }, [data, loading, error]);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchFavouritesThunk());
  }, []);

  useEffect(() => {
    console.log(data)
    setDataList(data);
  }, [data])

  const renderListItem = useCallback((placeItem: FavouritePlaceItem) => {
    const place = {
      lat: placeItem.lat,
      long: placeItem.lng,
      placeId: placeItem.placeId,
      name: placeItem.name
    };
    const onGetTemperature = async () => {
      const temperature = await FavouritesClient.getPlaceWeather(placeItem.placeId);
      setTemp(temperature);
      setTempPlace(placeItem.name);
      setIsModalOpen(true);
    }
    return (
      <ListItem key={placeItem.placeId} disablePadding sx={{ padding: 1 }}>
        <ListItemButton onClick={() => setSelectedPlace(place)}>
          <ListItemText primary={placeItem.name} />
        </ListItemButton>
        <IconButton
          sx={{
            alignSelf: 'center',
            padding: 1,
          }}
          onClick={() => onGetTemperature()}
        >
          <ThermostatIcon />
        </IconButton>
        <IconButton
          sx={{
            alignSelf: 'center',
            padding: 1
          }}
          onClick={() => FavouritesClient.deleteFavouriteItem(placeItem.placeId)}
        >
          <CancelIcon sx={{ color: 'red' }} />
        </IconButton>
      </ListItem>
    )
  }, []);

  return (
    <>
      <TemperatureModalComponent
        openModal={isModalOpen}
        place={tempPlace}
        temp={temp}
        onClose={() => setIsModalOpen(false)} />
      <DrawerComponent
        anchor='right'
        isVisible={true}
        variant={'permanent'}
        drawerWidth={350}
        enableCustomDrawerControl={false}
        listData={dataList}
        // @ts-ignore
        renderListItem={renderListItem}
        renderDrawerIconText={renderDrawerIconText}
        renderOnEmptyList={renderOnEmptyList}
      />
    </>
  )
}

const memoizedComponent = React.memo(FavouritePlacesDrawer);
const connector = connect<{}, MapDispatchToProps>(null, mapDispatchToProps);
export default connector(memoizedComponent);
