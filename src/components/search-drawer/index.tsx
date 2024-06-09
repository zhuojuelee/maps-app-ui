import { Button, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import SearchHistoryDrawer from '../search-history-drawer';
import SearchResultsDrawer from '../search-results-drawer';

const SearchInfoDrawer = () => {
  const [isSearchHistoryDrawerOpen, setIsSearchHistoryDrawerOpen] = useState<boolean>(false);
  const [isSearchResultsDrawerOpen, setIsSearchResultsDrawerOpen] = useState<boolean>(false);

  const toggleHistoryDrawer = useCallback(() => {
    if (isSearchResultsDrawerOpen) setIsSearchResultsDrawerOpen(false);

    setIsSearchHistoryDrawerOpen(true);
  }, [isSearchResultsDrawerOpen]);

  const onHistoryDrawerClose = useCallback(() => {
    setIsSearchHistoryDrawerOpen(false);
  }, []);

  const toggleResultsDrawer = useCallback(() => {
    if (isSearchHistoryDrawerOpen) setIsSearchHistoryDrawerOpen(false);

    setIsSearchResultsDrawerOpen(true);
  }, []);

  const onResultsDrawerClose = useCallback(() => {
    setIsSearchResultsDrawerOpen(false);
  }, []);

  return (
    <Stack alignItems='center' justifyContent='center' direction='row' gap={1} padding={2}>
      <>
        <Button onClick={toggleHistoryDrawer} sx={{ border: 1 }}>Open Search History</Button>
        <SearchHistoryDrawer
          isVisible={isSearchHistoryDrawerOpen}
          onDrawerClose={onHistoryDrawerClose}
        />
      </>
      <>
        <Button onClick={toggleResultsDrawer} sx={{ border: 1 }}>Open Search Results</Button>
        <SearchResultsDrawer
          isVisible={isSearchResultsDrawerOpen}
          onDrawerClose={onResultsDrawerClose}
        />
      </>
    </Stack>
  )
}

export default React.memo(SearchInfoDrawer);
