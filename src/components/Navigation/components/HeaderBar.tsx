import { IconButton } from '@mui/material';
import { ReactNode } from 'react';

import {
  HeaderContainer,
  LogoContainer,
  StyledMenuIcon,
} from './HeaderBar.styled';

export interface HeaderBarProps {
  children?: ReactNode;
  onClickHamburger: VoidFunction;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  children,
  onClickHamburger,
}) => {
  return (
    <HeaderContainer>
      <IconButton
        onClick={onClickHamburger}
        data-testid="hamburger-icon-button"
      >
        <StyledMenuIcon />
      </IconButton>
      <LogoContainer data-testid="logo-container" sx={{ lineHeight: 0 }}>
        {children}
      </LogoContainer>
    </HeaderContainer>
  );
};
