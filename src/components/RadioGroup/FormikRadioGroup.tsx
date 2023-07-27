import { FieldProps, getIn } from 'formik';
import {
  RadioGroupProps,
  Stack,
  RadioGroup,
  FormHelperText,
} from '@mui/material';
import _ from 'lodash';

type Props = FieldProps & Omit<RadioGroupProps, 'name' | 'value'>;

const FormikRadioGroup: React.FC<Props> = ({
  field,
  form,
  children,
  ...props
}) => {
  const fieldError = getIn(form.errors, field.name);
  const showError = getIn(form.touched, field.name) && !_.isNil(fieldError);

  return (
    <Stack direction="column" spacing={2}>
      <RadioGroup {...field} {...props} onBlur={field.onBlur}>
        {children}
      </RadioGroup>
      {showError && (
        <FormHelperText error={showError}>{fieldError}</FormHelperText>
      )}
    </Stack>
  );
};

export default FormikRadioGroup;
