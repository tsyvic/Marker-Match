import { Card, Stack, Typography, styled } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const MainCard = styled(Card)({
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '5px 4px 4px -1px rgba(115, 116, 125,0.75)',
  '&:hover': {
    boxShadow: '7px 7px 4px -1px rgba(75, 80, 85, 0.75)',
    cursor: 'pointer',
  },
});
export const CourseTitleContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});
export const CardContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'start',
});
export const CardTitle = styled(Typography)({
  fontSize: '30px',
});
export const CardSubHeader = styled(Typography)({
  fontSize: '18px',
});

export const Text = styled(Typography)({
  fontSize: '18px',
  marginTop: '5px',
});

export const PendingIcon = styled(HelpIcon)({
  position: 'relative',
  fontSize: '3.25vh',
  color: 'gray',
  alignSelf: 'end',
});

export const AcceptedIcon = styled(CheckCircleIcon)({
  position: 'relative',
  fontSize: '3.25vh',
  color: 'green',
  alignSelf: 'end',
});

export const RejectedIcon = styled(CancelIcon)({
  position: 'relative',
  fontSize: '3.25vh',
  color: 'red',
  alignSelf: 'end',
});
