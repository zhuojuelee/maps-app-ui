import React, { ReactNode, useMemo } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

type DrawerComponentProps = {
  isVisible: boolean;
  listData: any[];
  drawerWidth: number;
  enableCustomDrawerControl: boolean;
  variant?: 'temporary' | 'permanent' | 'persistent';
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  onDrawerClose?: () => void;
  renderDrawerIconText: () => ReactNode;
  renderListItem: (any) => ReactNode[];
  renderCustomDrawerControl?: () => ReactNode;
  renderOnEmptyList?: () => ReactNode;
}

const DrawerComponent: React.FC<DrawerComponentProps> = (props) => {
  const {
    variant = 'temporary',
    anchor = 'left',
    isVisible,
    listData,
    drawerWidth,
    enableCustomDrawerControl,
    onDrawerClose,
    renderListItem,
    renderDrawerIconText,
    renderOnEmptyList,
    renderCustomDrawerControl,
  } = props;

  const calculatedDrawerWidth = useMemo(() => {
    if (enableCustomDrawerControl && drawerWidth < 300) {
      return 300;
    }
    return drawerWidth;
  }, [enableCustomDrawerControl, drawerWidth])

  const DrawerList = (
    <Box sx={{ width: calculatedDrawerWidth }} role="presentation">
      <Stack
        alignItems='center'
        justifyContent='center'
        direction='row' gap={0}
      >
        {renderDrawerIconText()}
        {enableCustomDrawerControl ? renderCustomDrawerControl() : null}
      </Stack>
      <Divider />
      {listData.length > 0 ? (<List>
        {listData.map((data) => renderListItem(data))}
      </List>) : null}
      {listData.length === 0 && renderOnEmptyList !== undefined ? renderOnEmptyList() : null}
    </Box >
  );

  return (
    <div>
      <Drawer open={isVisible} anchor={anchor} variant={variant} onClose={onDrawerClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default React.memo(DrawerComponent);
