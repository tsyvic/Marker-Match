import React, { useEffect, useState } from 'react';
import {
  Stack,
  FormControlLabel,
  Radio,
  InputLabel,
  Autocomplete,
  TextField,
} from '@mui/material';
import { Field, useField, useFormikContext } from 'formik';
import FormikRadioGroup from '@/components/RadioGroup/FormikRadioGroup';
import FormikFileInput from '@/components/FormikFileInput/FormikFileInput';
import { Applicant } from '../types';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { trpc } from '@/utils/trpc';
import { UserContract } from '@prisma/client';
import FormikTextField from '@/components/TextField/FormikTextField';

type Props<T> = {
  name: string;
  label: string;
};

// const FormikAutoComplete = <T extends UserContract>({
//   name,
//   label,
// }: Props<T>) => {
//   const { data } = useSession();
//   const [field, meta] = useField<T[]>(name);
//   const { setFieldValue } = useFormikContext();
//   const [contracts, setContracts] = useState<UserContract[]>([]);

//   const userId = data?.user?.id;

//   if (!userId) {
//     return null;
//   }

//   useEffect(() => {
//     // Fetch contracts for the user
//     const fetchData = async () => {
//       const { data } = await trpc.contract.getUserContractsByUserId.useQuery(
//         userId,
//         {
//           enabled: !!userId,
//         }
//       );

//       setContracts((data as UserContract[]) ?? []);
//     };

//     fetchData();
//   }, [userId]);

//   const handleInputChange = async (
//     event: React.ChangeEvent<HTMLInputElement>,
//     newInputValue: string
//   ) => {
//     // If the contract doesn't exist, add it to the database
//     if (!contracts?.find((contract) => contract.name === newInputValue)) {
//       // Call your tRPC mutation to create a new contract
//       const { data } = await trpc.contract.createContract.mutation({
//         userId,
//         name: newInputValue,
//       });

//       if (data) {
//         setContracts((prevContracts) => [...prevContracts, data]);
//         setFieldValue(name, [...field.value, data]);
//       }
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<{}>, value: T | T[]) => {
//     setFieldValue(name, value);
//   };

//   return (
//     <Autocomplete
//       multiple
//       {...field}
//       options={contracts}
//       onChange={handleChange}
//       onInputChange={handleInputChange}
//       getOptionLabel={(option) => option.name}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           error={meta.touched && !!meta.error}
//           helperText={meta.touched && meta.error}
//         />
//       )}
//     />
//   );
// };

export const PageTwo = () => {
  const { values } = useFormikContext<Applicant>();
  return (
    <Stack spacing={3}>
      <InputLabel>Other TA/GTA Contracts this Semester</InputLabel>
      <Field
        component={FormikRadioGroup}
        name="personalDetails.otherContracts"
        // required
        row
      >
        <FormControlLabel control={<Radio />} label="Yes" value={true} />
        <FormControlLabel control={<Radio />} label="No" value={false} />
      </Field>

      {values.personalDetails.otherContracts === 'true' && (
        <Field
          component={FormikTextField}
          name="personalDetails.otherContractsDescription"
          label="Description of Other Contracts"
          // required
        />
      )}

      <InputLabel>Previous GTA Contract</InputLabel>
      <Field
        component={FormikRadioGroup}
        name="personalDetails.hasPreviousGTAContract"
        // required
        row
      >
        <FormControlLabel control={<Radio />} label="Yes" value={true} />
        <FormControlLabel control={<Radio />} label="No" value={false} />
      </Field>

      <InputLabel>Please upload only PDF files.</InputLabel>
      <Field
        component={FormikFileInput}
        name="academicRecord"
        label="Upload Academic Record"
      />

      <Field component={FormikFileInput} name="cv" label="Upload CV" />

      {values.personalDetails.validWorkPermitOrVisa === 'true' && (
        <Field
          component={FormikFileInput}
          name="visa"
          label="Work Permit/Visa"
        />
      )}
    </Stack>
  );
};
