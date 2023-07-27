import { ReactNode } from 'react';

import { List } from '@mui/material';

export interface NavigationLinksProps {
  children?: ReactNode;
}

export const NavigationLinks = ({ children }: NavigationLinksProps) => (
  <List data-testid="links">{children}</List>
);
