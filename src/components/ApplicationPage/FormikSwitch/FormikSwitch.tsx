import _ from 'lodash';
import { FC } from 'react';
import { FieldProps, getIn } from 'formik';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

interface Props extends FieldProps {
  label: string;
}

type SwitchFieldProps = Props & Omit<SwitchProps, 'name' | 'value' | 'error'>;

const FormikSwitch: FC<SwitchFieldProps> = ({
  field,
  form,
  label,
  ...props
}) => {
  const fieldError = getIn(form.errors, field.name);
  const showError = getIn(form.touched, field.name) && !_.isNil(fieldError);

  return (
    <FormControl error={showError}>
      <FormControlLabel
        labelPlacement="top"
        label={label}
        control={
          <Switch
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            {...props}
          />
        }
      />
      {showError && <FormHelperText>{fieldError}</FormHelperText>}
    </FormControl>
  );
};

export default FormikSwitch;
