import { Button, Typography } from '@mui/material';
import { FieldProps } from 'formik';
import { useState } from 'react';

type Props = FieldProps & {
  label: string;
};

const FormikFileInput: React.FC<Props> = ({ field, form, label }) => {
  const { value } = field;
  const [fileName, setFileName] = useState<string | null>(value?.name ?? '');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFileName(file?.name ?? null);
    form.setFieldValue(field.name, file);
  };

  return (
    <>
      <Button variant="outlined" component="label" size="medium" disableRipple>
        {label}
        <input type="file" hidden onChange={handleChange} accept=".pdf" />
      </Button>
      {fileName && <Typography>{fileName}</Typography>}
    </>
  );
};

export default FormikFileInput;
