import { Avatar, Chip, styled, Typography } from '@mui/material';

type ProfileLinkProps = {
  linkEnabled: boolean;
};

type UserAvatarProps = {
  active: boolean;
};

export const NavProfileContainer = styled('div')<ProfileLinkProps>(
  ({ ...props }) => ({
    display: 'flex',
    width: '100%',
    cursor: props.linkEnabled ? 'pointer' : 'default',
  })
);

export const ProfileName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

export const ParentStatusLabel = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: theme.spacing(2),
  fontSize: theme.typography.caption.fontSize,
  fontWeight: 600,
  color: theme.palette.primary.contrastText,
}));

export const ProfileTextContainer = styled('div')(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: theme.spacing(1),
}));

export const UserAvatar = styled(Avatar, {
  shouldForwardProp: (propName) => propName !== 'active',
})<UserAvatarProps>(({ theme, ...props }) => ({
  backgroundColor: props.active
    ? theme.palette.primary.main
    : theme.palette.grey[400],
}));
