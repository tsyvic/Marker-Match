import { Box, styled } from '@mui/material';

export const ApplicationContainer = styled(Box)({
  width: '100%',
  marginTop: '2vh',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
});
