import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useCallback } from 'react';
import { SelectedPlace } from '../../types/types-public';
import { FavouritesClient } from '../../lib/favourites-client';
import { addFavouritePlace } from '../../reducers/favourites';
import { connect } from 'react-redux';

type MapStateToPropType = {
  selectedPlace: SelectedPlace;
};

type MapDispatchToPropsType = {
  addFavouritePlace: (payload) => void;
}

type ComponentProps = {};

type FavouriteButton = MapStateToPropType & MapDispatchToPropsType & ComponentProps;

const mapStateToProps = (state) => ({
  ...state.selectedPlace
});

const mapDispatchToProps = {
  addFavouritePlace
}

const FavouriteButton: React.FC<FavouriteButton> = (props) => {
  const { selectedPlace, addFavouritePlace } = props;

  const onClick = useCallback(async () => {
    const formatData = {
      ...selectedPlace,
      lng: selectedPlace.long
    }

    // @ts-ignore
    const ok = await FavouritesClient.createFavouriteItem(formatData);
    if (ok) addFavouritePlace(selectedPlace);
  }, [selectedPlace]);

  return (
    <IconButton
      onClick={onClick}
    >
      <FavoriteIcon sx={{ color: 'red', height: 50, width: 50, border: 2 }} />
    </IconButton>
  )
}

const memoized = React.memo(FavouriteButton);
const connector =
  connect<MapStateToPropType, MapDispatchToPropsType>(mapStateToProps, mapDispatchToProps);
export default connector(memoized);
