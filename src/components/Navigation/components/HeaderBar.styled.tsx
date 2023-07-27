import { styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const HeaderContainer = styled('div')(({ theme }) => ({
  height: '3rem',
  backgroundColor: theme.palette.common.white,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative',
  padding: theme.spacing(0, 1.5),
  flexGrow: 0,
  flexShrink: 0,
}));

export const LogoContainer = styled('div')(() => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
}));

export const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({
  color: theme.palette.common.black,
}));
