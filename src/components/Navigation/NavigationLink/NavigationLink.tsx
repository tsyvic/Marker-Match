import {
  cloneElement,
  ElementType,
  FC,
  MouseEventHandler,
  ReactElement,
} from 'react';

import {
  ListItem,
  ListItemButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

import { NavigationLinkComponentProps } from '../types';
import { IconContainer, LinkContainer } from './NavigationLink.styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { colors } from '@/theme';

export interface IconProps {
  color?: string;
  fontSize?: string | number | undefined;
  sx?: SxProps<Theme>;
}

export interface NavigationLinkProps {
  active?: boolean;
  dataTestId?: string;
  endIcon?: ReactElement;
  icon: ReactElement;
  iconProps?: IconProps;
  LinkComponent?: ElementType<NavigationLinkComponentProps>;
  title: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  active: activeProp,
  dataTestId,
  endIcon: propEndIcon,
  icon: propIcon,
  iconProps,
  LinkComponent = Link,
  title,
  to,
  onClick,
}) => {
  const router = useRouter();
  const active =
    typeof activeProp === 'boolean' ? activeProp : router.pathname === to;

  const iconColor = active ? 'inherit' : colors.stone60;
  const icon = cloneElement(propIcon, {
    sx: { color: iconColor },
    fontSize: 'inherit',
    ...iconProps,
  });
  const endIcon = propEndIcon
    ? cloneElement(propEndIcon, {
        sx: { color: iconColor },
        fontSize: 'inherit',
        ...iconProps,
      })
    : undefined;

  const linkChildren = (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton disableRipple sx={{ padding: 0 }}>
        <LinkContainer
          $active={active}
          data-active={active}
          data-testid={dataTestId}
        >
          <Stack direction="row" justifyContent="space-between">
            <IconContainer>{icon}</IconContainer>
            <Typography
              variant="body2"
              fontWeight="semibold"
              paddingLeft={1}
              data-testid="link-title"
            >
              {title}
            </Typography>
          </Stack>
          {endIcon && <IconContainer>{endIcon}</IconContainer>}
        </LinkContainer>
      </ListItemButton>
    </ListItem>
  );

  return to ? (
    <LinkComponent to={to} style={{ textDecoration: 'none' }} href={to}>
      {linkChildren}
    </LinkComponent>
  ) : (
    linkChildren
  );
};
