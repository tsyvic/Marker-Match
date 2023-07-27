import { Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const ControlContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '4vh',
  width: '100%',
  backgroundColor: 'transparent',
});

export const FilterSelectionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'end',
});

export const SearchBar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  width: '25vw',
  height: '100%',
  backgroundColor: '#e5e5e5',
  borderRadius: '12px',
});

export const SearchBarIcon = styled(SearchIcon)({
  fontSize: '3.25vh',
  margin: '0 10px',
});

export const FilterIcon = styled(FilterAltIcon)({
  fontSize: '3.25vh',
  margin: '0 10px',
});

export const CheckBox = styled(CheckBoxOutlineBlankIcon)({
  fontSize: '3.25vh',
  margin: '0 10px',
});

export const TickedCheckBox = styled(CheckBoxIcon)({
  fontSize: '3.25vh',
  margin: '0 10px',
});

export const CourseCardContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  marginTop: '2vh',
});
