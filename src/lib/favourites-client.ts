import fetch from 'node-fetch';
import { FavouritePlaceItem } from '../types/types-public';

const ACTION = Object.freeze({
  GET_ALL: 'getAll',
  CREATE_NEW: 'createNew',
  DELETE_PLACE: 'deletePlace',
  GET_WEATHER: 'getWeather'
});

const getPath = (action, placeId?: string) => {
  switch (action) {
    case ACTION.GET_ALL:
    case ACTION.CREATE_NEW:
      return `${import.meta.env.VITE_SERVER_URI}/favourites`;
    case ACTION.DELETE_PLACE:
      return `${import.meta.env.VITE_SERVER_URI}/favourites/${placeId}`;
    case ACTION.GET_WEATHER:
      return `${import.meta.env.VITE_SERVER_URI}/favourites/${placeId}/weather`;
    default:
      ''
  };
};

const fetchFavouritesList = async () => {
  const response = await fetch(getPath(ACTION.GET_ALL), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) return false;

  const data = await response.json();
  // @ts-ignore
  const { favourites } = data;
  return [...favourites];
};

const createFavouriteItem = async (place: FavouritePlaceItem) => {
  const response = await fetch(getPath(ACTION.CREATE_NEW, place.placeId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(place),
  });

  if (response.ok) {
    return true;
  }
  return false;
}

const deleteFavouriteItem = async (placeId: string) => {
  const response = await fetch(getPath(ACTION.DELETE_PLACE, placeId), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    return true;
  }
  return false;
}

const getPlaceWeather = async (placeId: string) => {
  const response = await fetch(getPath(ACTION.GET_WEATHER, placeId), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) return undefined;
  const data = await response.text();
  return data;
}


const FavouritesClient = {
  fetchFavouritesList,
  createFavouriteItem,
  deleteFavouriteItem,
  getPlaceWeather
};

export default FavouritesClient;
