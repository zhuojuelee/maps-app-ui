import React, { useCallback } from 'react';
import DrawerComponent from '../../drawer';
import { connect } from 'react-redux';
import { SearchResults } from '../../../types/types-public';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { resetSearchResults } from '../../../reducers/search-results';

type MapStateToPropsType = {
  searchResults: SearchResults[];
};

type MapDispatchToPropsType = {
  resetSearchResults: () => void;
};

type ComponentProps = { isVisible: boolean, onDrawerClose: () => void }

type SearchResultsDrawerComponentProps =
  MapStateToPropsType & MapDispatchToPropsType & ComponentProps;

const mapStateToProps = (state) => ({
  searchResults: state.searchResults
});

const mapDispatchToProps = {
  resetSearchResults: resetSearchResults,
};

const SearchResultsDrawer: React.FC<SearchResultsDrawerComponentProps> = (props) => {
  const { searchResults, resetSearchResults, isVisible, onDrawerClose } = props;

  const renderDrawerIconText = useCallback(() => {
    return (
      <Stack alignItems='center' justifyContent='left' direction='row' gap={1} padding={2}>
        <HistoryIcon />
        <Typography variant='body1'>Search History</Typography>
      </Stack>
    )
  }, []);

  const renderListItem = useCallback((searchedItem: string) => {
    return (
      <ListItem key={searchedItem} disablePadding>
        <ListItemButton>
          <ListItemText primary={searchedItem} />
        </ListItemButton>
      </ListItem>
    )
  }, [searchResults]);

  const renderCustomControl = useCallback(() => {
    return (
      <IconButton
        sx={{
          alignSelf: 'center',
          border: 1
        }}
        onClick={resetSearchResults}
      >
        <DeleteForeverIcon />
      </IconButton>
    )
  }, [resetSearchResults]);

  return (
    <DrawerComponent
      listData={searchResults}
      isVisible={isVisible}
      // @ts-ignore
      renderListItem={renderListItem}
      renderCustomDrawerControl={renderCustomControl}
      renderDrawerIconText={renderDrawerIconText}
      drawerButtonTitle='Open Search Results'
      enableCustomDrawerControl={true}
      drawerWidth={300}
      onDrawerClose={onDrawerClose}
    />
  );
};

const memoized = React.memo(SearchResultsDrawer);
const connector =
  connect<MapStateToPropsType, MapDispatchToPropsType>(mapStateToProps, mapDispatchToProps);
export default connector(memoized);
