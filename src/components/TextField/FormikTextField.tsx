import { FieldProps, getIn } from 'formik';
import { TextFieldProps, TextField } from '@mui/material';
import _ from 'lodash';

type Props = FieldProps & Omit<TextFieldProps, 'name' | 'value' | 'error'>;

const FormikTextField: React.FC<Props> = ({
  field,
  form,
  onChange,
  ...props
}) => {
  const fieldError = getIn(form.errors, field.name);
  const showError = getIn(form.touched, field.name) && !_.isNil(fieldError);

  return (
    <TextField
      {...field}
      {...props}
      size="small"
      disabled={form.isSubmitting}
      error={showError}
      helperText={showError && fieldError}
      onBlur={field.onBlur}
      onChange={(event) => {
        // Do not switch this order, otherwise you might cause a race condition
        // See https://github.com/formium/formik/issues/2083#issuecomment-884831583
        form.setFieldTouched(field.name, true, false);
        form.setFieldValue(field.name, event.target.value, true);
        onChange?.(event);
      }}
    />
  );
};

export default FormikTextField;
