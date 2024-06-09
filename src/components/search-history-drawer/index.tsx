import React, { useCallback } from 'react';
import DrawerComponent from '../drawer';
import { connect } from 'react-redux';
import { SearchHistory } from '../../types/types-public';
import { IconButton, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { resetSearchHistory } from '../../reducers/search-history';

type MapStateToPropsType = {
  searchHistory: SearchHistory[];
}

type MapDispatchToPropsType = {
  resetSearchHistory: () => void;
}

type ComponentProps = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state) => ({
  searchHistory: state.searchHistory
})

const mapDispatchToProps = {
  resetSearchHistory: resetSearchHistory
};

const SearchHistoryDrawer: React.FC<ComponentProps> = (props) => {
  const { searchHistory, resetSearchHistory } = props;

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
      title={'Search History'}
      listData={searchHistory}
      // @ts-ignore
      renderListItem={renderListItem}
      renderCustomDrawerControl={renderCustomControl}
      drawerButtonTitle='Open Search History'
      enableCustomDrawerControl={true}
      drawerWidth={300}
    />
  );
};

const memoized = React.memo(SearchHistoryDrawer);
const connector = connect<MapStateToPropsType>(mapStateToProps, mapDispatchToProps);
export default connector(memoized);
