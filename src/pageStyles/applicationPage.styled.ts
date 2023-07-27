import { Button, styled } from '@mui/material';
import { Form } from 'formik';

export const FieldsWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '1rem',
}));

export const FormWrapper = styled(Form)(() => ({
  height: '100%',
  // maxWidth: '45%',
}));

export const AddCourseButton = styled(Button)(() => ({
  borderRadius: '0',
}));
