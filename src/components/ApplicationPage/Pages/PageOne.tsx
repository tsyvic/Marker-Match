import { Field, useFormikContext } from 'formik';
import { FormControlLabel, InputLabel, Radio, Stack } from '@mui/material';
import FormikTextField from '@/components/TextField/FormikTextField';
import FormikRadioGroup from '@/components/RadioGroup/FormikRadioGroup';
import { Applicant } from '../types';

export const PageOne = () => {
  const { values } = useFormikContext<Applicant>();
  return (
    <Stack spacing={3}>
      <Stack
        display="flex"
        direction="row"
        width="100%"
        gap={3}
        justifyContent="space-between"
      >
        <Field
          component={FormikTextField}
          name="personalDetails.upi"
          label="UPI"
          required
        />
        <Field
          component={FormikTextField}
          name="personalDetails.AUID"
          label="AUID"
          required
        />
      </Stack>

      <Field
        component={FormikTextField}
        name="personalDetails.email"
        label="Email"
        fullWidth
        required
      />

      <Field
        component={FormikTextField}
        name="personalDetails.maxHoursPerWeek"
        type="number"
        label="Max Hours Per Week"
        required
      />

      <Field
        component={FormikTextField}
        name="personalDetails.currentSemesterDetails"
        label="Current Semester Details"
        required
      />

      <InputLabel>Currently Overseas</InputLabel>
      <Field
        component={FormikRadioGroup}
        name="personalDetails.currentlyOverseas"
        row
      >
        <FormControlLabel control={<Radio />} label="Yes" value={true} />
        <FormControlLabel control={<Radio />} label="No" value={false} />
      </Field>

      {values.personalDetails.currentlyOverseas === 'true' && (
        <>
          <InputLabel>Arrival Date in NZ</InputLabel>
          <Field
            type="date"
            name="personalDetails.arrivalDate"
            label="Arrival Date in NZ"
          />
        </>
      )}

      <InputLabel>Citizen or Permanent Resident</InputLabel>
      <Field
        component={FormikRadioGroup}
        name="personalDetails.citizenOrPermanentResident"
        row
      >
        <FormControlLabel control={<Radio />} label="Yes" value="true" />
        <FormControlLabel control={<Radio />} label="No" value="false" />
      </Field>

      {values.personalDetails.citizenOrPermanentResident === 'false' && (
        <>
          <InputLabel>Valid Work Permit/Visa</InputLabel>
          <Field
            component={FormikRadioGroup}
            name="personalDetails.validWorkPermitOrVisa"
            row
          >
            <FormControlLabel control={<Radio />} label="Yes" value="true" />
            <FormControlLabel control={<Radio />} label="No" value="false" />
          </Field>
        </>
      )}

      {/* 

    <Field
      component={FormikTextField}
      name="personalDetails.otherContractsDescription"
      label="Description of Other Contracts"
    />


*/}
    </Stack>
  );
};
