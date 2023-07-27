import { colors } from '@/theme';
import { Box, Paper, styled } from '@mui/material';

export const Body = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
});

export const MainContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
});

export const MainBody = {
  flexGrow: 1,
  backgroundColor: colors.stone10,
  maxWidth: '100vw',
  padding: '2vh 2vw',
};
