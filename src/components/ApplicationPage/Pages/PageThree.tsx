import { Field } from 'formik';
import FormikTextField from '@/components/TextField/FormikTextField';
import FormikSwitch from '../FormikSwitch/FormikSwitch';
import FormikGradeSelect from '@/components/FormikSelect/FormikSelect';

export const PageThree = ({
  index,
  course,
}: {
  index: number;
  course: {
    name: string;
    grade: string;
    previousExperience: string;
    wantToTutor: boolean;
    wantToMark: boolean;
  };
}) => {
  return (
    <>
      <Field
        component={FormikTextField}
        name={`courses[${index}].name`}
        label={'Course Name'}
        value={course.name}
        required
      />
      <Field
        component={FormikGradeSelect}
        name={`courses[${index}].grade`}
        label={'Grade'}
        required
      />

      <Field
        component={FormikTextField}
        name={`courses[${index}].previousExperience`}
        label={'Relevant Previous Experience'}
        required
      />
      <Field
        component={FormikSwitch}
        name={`courses[${index}].wantToTutor`}
        label="Want to Tutor"
      />
      <Field
        component={FormikSwitch}
        name={`courses[${index}].wantToMark`}
        label="Want to Mark"
      />
    </>
  );
};
