import {
  Card,
  ListItem,
  Stack,
  Typography,
  CardContent as MuiCardContent,
  styled,
} from '@mui/material';

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

interface CourseCardProps {
  selected?: boolean;
}

export const CourseCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CourseCardProps>(({ theme, selected }) => ({
  height: '350px',
  borderRadius: '10px',
  textOverflow: 'ellipsis',
  boxShadow: '5px 4px 4px -1px rgba(115, 116, 125,0.75)',
  outline: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
  '&:hover': {
    boxShadow: '7px 7px 4px -1px rgba(75, 80, 85, 0.75)',
    cursor: 'pointer',
  },
}));

export const ListStyle = styled(ListItem)({
  padding: '0px',
});

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  '&:last-child': {
    paddingBottom: '16px',
  },
}));
