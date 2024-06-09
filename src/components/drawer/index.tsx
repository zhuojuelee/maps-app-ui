import React, { ReactNode, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import HistoryIcon from '@mui/icons-material/History';
import { Typography } from '@mui/material';
import { DrawerListData } from '../../types/types-public';

type DrawerIconTextProps = {
  title: string;
}

const DrawerIconText: React.FC<DrawerIconTextProps> = (props) => {
  const { title } = props;

  return (
    <Stack alignItems='center' justifyContent='left' direction='row' gap={1} padding={2}>
      <HistoryIcon />
      <Typography variant='body1'>{title}</Typography>
    </Stack>
  )
}

type DrawerComponentProps = {
  title: string;
  listData: DrawerListData[];
  drawerWidth: number;
  drawerButtonTitle: string;
  enableCustomDrawerControl: boolean;
  renderListItem: (any) => ReactNode[];
  renderCustomDrawerControl?: () => ReactNode;
}

const DrawerComponent: React.FC<DrawerComponentProps> = (props) => {
  const [open, setOpen] = useState(false);
  const {
    title,
    listData,
    drawerWidth,
    drawerButtonTitle,
    enableCustomDrawerControl,
    renderListItem,
    renderCustomDrawerControl
  } = props;

  const calculatedDrawerWidth = useMemo(() => {
    if (enableCustomDrawerControl && drawerWidth < 300) {
      return 300;
    }
    return drawerWidth;
  }, [enableCustomDrawerControl, drawerWidth])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: calculatedDrawerWidth }} role="presentation" onClick={toggleDrawer(false)}>
      <Stack
        alignItems='center'
        justifyContent='center'
        direction='row' gap={0}
      >
        <DrawerIconText title={title} />
        {enableCustomDrawerControl ? renderCustomDrawerControl() : null}
      </Stack>
      <Divider />
      <List>
        {listData.map((data) => renderListItem(data))}
      </List>
    </Box >
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>{drawerButtonTitle}</Button>
      <Drawer open={open} variant='persistent' onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default React.memo(DrawerComponent);
