import { FieldProps, getIn } from 'formik';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
  FormHelperText,
} from '@mui/material';
import { FC } from 'react';
import { Grade } from '@prisma/client';
import _ from 'lodash';

type Props = FieldProps &
  Omit<SelectProps, 'name' | 'value'> & {
    label: string;
  };

const FormikGradeSelect: FC<Props> = ({ field, form, label, ...props }) => {
  const fieldError = getIn(form.errors, field.name);
  const showError = getIn(form.touched, field.name) && !_.isNil(fieldError);
  return (
    <FormControl
      error={form.touched[field.name] && Boolean(form.errors[field.name])}
    >
      <InputLabel>{label}</InputLabel>
      <Select {...field} {...props} autoWidth>
        {Object.keys(Grade).map((gradeKey) => (
          <MenuItem
            key={gradeKey}
            value={Grade[gradeKey as keyof typeof Grade]}
          >
            {gradeKey.replace('_', '-')}
          </MenuItem>
        ))}
      </Select>
      {form.touched[field.name] && form.errors[field.name] ? (
        <FormHelperText>{showError}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default FormikGradeSelect;
