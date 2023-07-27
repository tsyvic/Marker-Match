import { FC, ReactNode, useEffect, useState } from 'react';

import { Box } from '@mui/material';

import {
  CloseButton,
  StyledCloseIcon,
  StyledDrawer,
} from './Navigation.styled';
import { HeaderBar } from './components/HeaderBar';

const DRAWER_WIDTH = 280;
export interface NavigationProps {
  children?: ReactNode;
  logo?: ReactNode;
}

const MobileNavMenu: FC<NavigationProps> = ({ children, logo }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerClose = () => setIsDrawerOpen(false);

  // by default, whenever the location changes i.e. from clicking on a navigation link
  // there should be a side-effect of closing the navigation drawer as well
  // useEffect(() => {
  //   setIsDrawerOpen(false);
  // }, [location]);

  return (
    <>
      <HeaderBar onClickHamburger={() => setIsDrawerOpen(true)}>
        {logo}
      </HeaderBar>
      <StyledDrawer
        drawerWidth={DRAWER_WIDTH}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        data-testid="mobile-nav-drawer"
      >
        <CloseButton data-testid="close-button" onClick={handleDrawerClose}>
          <StyledCloseIcon />
        </CloseButton>
        {children}
      </StyledDrawer>
    </>
  );
};

const DesktopNavMenu: FC<NavigationProps> = ({ children, logo }) => {
  return (
    <StyledDrawer
      anchor="left"
      drawerWidth={DRAWER_WIDTH}
      open
      sx={{ flexShrink: 0 }}
      variant="permanent"
    >
      {logo && <Box sx={{ paddingY: 2.5, alignSelf: 'center' }}>{logo}</Box>}
      {children}
    </StyledDrawer>
  );
};

export const Navigation = DesktopNavMenu;
