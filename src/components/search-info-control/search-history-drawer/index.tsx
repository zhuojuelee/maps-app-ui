import React, { useCallback } from 'react';
import DrawerComponent from '../../drawer';
import { connect } from 'react-redux';
import { SearchHistory } from '../../../types/types-public';
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
import { resetSearchHistory } from '../../../reducers/search-history';


type MapStateToPropsType = {
  searchHistory: SearchHistory[];
};

type MapDispatchToPropsType = {
  resetSearchHistory: () => void;
};

type ComponentProps = { isVisible: boolean, onDrawerClose: () => void }

type SearchHistoryDrawerProps = MapStateToPropsType & MapDispatchToPropsType & ComponentProps

const mapStateToProps = (state) => ({
  searchHistory: state.searchHistory
});

const mapDispatchToProps = {
  resetSearchHistory: resetSearchHistory
};

const SearchHistoryDrawer: React.FC<SearchHistoryDrawerProps> = (props) => {
  const { searchHistory, resetSearchHistory, isVisible, onDrawerClose } = props;

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
  }, [searchHistory]);

  const renderCustomControl = useCallback(() => {
    return (
      <IconButton
        sx={{
          alignSelf: 'center',
          border: 1
        }}
        onClick={resetSearchHistory}
      >
        <DeleteForeverIcon />
      </IconButton>
    )
  }, [resetSearchHistory]);

  return (
    <DrawerComponent
      listData={searchHistory}
      isVisible={isVisible}
      onDrawerClose={onDrawerClose}
      // @ts-ignore
      renderListItem={renderListItem}
      renderCustomDrawerControl={renderCustomControl}
      renderDrawerIconText={renderDrawerIconText}
      drawerButtonTitle='Open Search History'
      enableCustomDrawerControl={true}
      drawerWidth={300}
    />
  );
};

const memoized = React.memo(SearchHistoryDrawer);
const connector =
  connect<MapStateToPropsType, MapDispatchToPropsType>(mapStateToProps, mapDispatchToProps);
export default connector(memoized);
