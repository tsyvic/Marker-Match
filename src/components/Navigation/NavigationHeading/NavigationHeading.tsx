import { ReactNode } from 'react';

import { ListItem, ListItemButton, Typography } from '@mui/material';

interface NavigationHeadingProps {
  children?: ReactNode;
}

export const NavigationHeading = ({ children }: NavigationHeadingProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton disableRipple>
        <Typography variant="caption" fontWeight="bold">
          {children}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};
