import { Drawer, styled, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<{ drawerWidth: number }>(({ drawerWidth }) => ({
  width: drawerWidth,

  // The container that holds the children of the Drawer component
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

export const BottomContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',
  marginBottom: theme.spacing(4),
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  fontSize: theme.spacing(2),
}));

export const ChristmasSpirit = styled('div')(({ theme }) => ({
  background: 'url(/themes/christmas/santa_rudolph.gif) left/contain',
  backgroundRepeat: 'no-repeat',
  height: theme.spacing(12),
  marginBottom: theme.spacing(1),
}));
