import { lighten, styled } from '@mui/material';

type ActiveProps = {
  $active?: boolean;
};

export const LinkContainer = styled('div', {
  shouldForwardProp: (propName) => propName !== '$active',
})<ActiveProps>(({ theme, $active }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  marginLeft: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  backgroundColor: $active
    ? lighten(theme.palette.primary.main, 0.9)
    : 'transparent',
  color: $active ? theme.palette.primary.main : theme.palette.text.primary,

  '&::before': {
    content: '""',
    width: '0.25rem',
    position: 'absolute',
    backgroundColor: $active ? theme.palette.primary.main : 'transparent',
    left: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
}));

export const IconContainer = styled('div')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  display: 'flex',
  alignItems: 'center',
}));
