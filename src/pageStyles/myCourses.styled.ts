import { Box, ListItem, Stack, Typography, styled } from '@mui/material';

export const CourseCardContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  marginTop: '2vh',
});

export const CourseInfo = styled(Box)({
  marginTop: '2vh',
  backgroundColor: '#fff',
  borderRadius: '10px',
  textOverflow: 'ellipsis',
  boxShadow: '5px 4px 4px -1px rgba(115, 116, 125,0.75)',
  '&:hover': {
    boxShadow: '7px 7px 4px -1px rgba(75, 80, 85, 0.75)',
    cursor: 'pointer',
  },
  padding: '16px',
});

export const CourseTitleContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});
export const CourseCardTitle = styled(Typography)({
  fontSize: '30px',
  fontWeight: '500',
});
export const CourseCardSubHeader = styled(Typography)({
  fontSize: '18px',
  marginTop: '-5px',
});

export const ListStyle = styled(ListItem)({
  padding: '0px',
});
