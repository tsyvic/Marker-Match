import AWS from 'aws-sdk';

import {
  AddCourseButton,
  FormWrapper,
} from '@/pageStyles/applicationPage.styled';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { DateTime } from 'luxon';

import { Dispatch, SetStateAction, useState } from 'react';
import { PageOne, PageTwo, PageThree } from './Pages';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import {
  Grade,
  ApplicationStatus,
  ApplicationRole,
  Semester,
} from '@prisma/client';

interface FormValues {
  personalDetails: {
    upi: string;
    AUID: string;
    email: string;
    currentSemesterDetails: string;
    currentlyOverseas: boolean;
    arrivalDate: Date;
    citizenOrPermanentResident: boolean;
    validWorkPermitOrVisa: boolean;
    otherContracts: boolean;
    otherContractsDescription: string;
    hasPreviousGTAContract: boolean;
    maxHoursPerWeek: number;
  };
  courses: {
    id: string;
    name: string;
    grade: string;
    previousExperience: string;
    wantToTutor: boolean;
    wantToMark: boolean;
  }[];
}

// Configure the AWS environment
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

interface UploadFileOptions {
  userId: string;
  file: Express.Multer.File;
  prefix: string;
}

async function uploadFile(
  options: UploadFileOptions
): Promise<AWS.S3.ManagedUpload.SendData> {
  const { userId, file, prefix } = options;
  const key = `${userId}/${prefix}/${file.filename}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'marker-match',
    Key: key,
    Body: file,
    ACL: 'public-read',
  };

  const upload = new AWS.S3.ManagedUpload({ params });
  return upload.promise();
}

export const validationSchema = Yup.object().shape({
  academicRecord: Yup.mixed(),
  cv: Yup.mixed(),
  visa: Yup.mixed(),
  personalDetails: Yup.object().shape({
    upi: Yup.string().required('Required'),
    AUID: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    currentSemesterDetails: Yup.string().required('Required'),
    currentlyOverseas: Yup.bool().required('Required'),
    arrivalDate: Yup.date().when(
      'currentlyOverseas',
      (currentlyOverseas, schema) =>
        currentlyOverseas ? schema.required('Required') : schema
    ),
    citizenOrPermanentResident: Yup.bool().required('Required'),
    validWorkPermitOrVisa: Yup.bool().when(
      'citizenOrPermanentResident',
      (citizenOrPermanentResident, schema) =>
        citizenOrPermanentResident ? schema : schema.required('Required')
    ),
    otherContracts: Yup.bool().required('Required'),
    otherContractsDescription: Yup.string(),
    hasPreviousGTAContract: Yup.bool().required('Required'),
    maxHoursPerWeek: Yup.number()
      .required('Required')
      .min(5, 'Minimum 5 hours/week'),
  }),
  courses: Yup.array()
    .of(
      Yup.object()
        .shape({
          wantToTutor: Yup.bool(),
          wantToMark: Yup.bool(),
          grade: Yup.string().required('Required'),
          previousExperience: Yup.string().required('Required'),
        })
        .test(
          'either_or',
          'You must either want to tutor or want to mark',
          function (value) {
            return value.wantToTutor || value.wantToMark;
          }
        )
    )
    .required('Must add at least one course'),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractErrorMessages = (obj: any): string[] => {
  let messages: string[] = [];

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      messages.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      messages = [...messages, ...extractErrorMessages(obj[key])];
    }
  }

  return messages;
};

const ErrorList = ({ currentPage }: { currentPage: number }) => {
  const { errors } = useFormikContext<FormValues>();
  const personalDetailsErrors = extractErrorMessages(
    errors.personalDetails || {}
  );

  const eitherOrError = errors.courses && currentPage === 3;

  const previousPageErrors =
    personalDetailsErrors.length > 0 && currentPage === 3;

  return (
    <>
      {previousPageErrors && (
        <Typography color="error">
          Some required fields on a previous page have not been filled out.
        </Typography>
      )}
      {eitherOrError && (
        <Typography color="error">
          For each course, you must select at least &quot;Want to Tutor &quot;
          or &quot;Want to Mark&quot;.
        </Typography>
      )}
    </>
  );
};

interface FormButtonsProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  submitForm: () => void;
}

const FormButtons = ({ step, setStep, submitForm }: FormButtonsProps) => (
  <Stack gap={3} alignItems="center" justifyContent="center" width="45%">
    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
      {step !== 1 && (
        <Button
          onClick={() => {
            setStep((preValue) => preValue - 1);
          }}
          variant="outlined"
        >
          Back
        </Button>
      )}
      {step !== 3 && (
        <Button
          onClick={() => {
            setStep((preValue) => preValue + 1);
          }}
          variant="contained"
        >
          Next
        </Button>
      )}
      {step === 3 && (
        <Button variant="contained" type="submit" onClick={submitForm}>
          Submit
        </Button>
      )}
    </Stack>
  </Stack>
);

interface CoursePageQuery extends ParsedUrlQuery {
  courseIds: string;
}

export const ApplicationPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const userId = data?.user?.id;

  const { courseIds } = router.query as CoursePageQuery;
  const [step, setStep] = useState(1);
  const listOfCourseIds = courseIds?.split(',') ?? [];
  const { isLoading, data: courses } =
    trpc.courses.getCourse.useQuery(listOfCourseIds);

  const { mutateAsync: mutateApplicant } =
    trpc.applicant.getOrCreateApplicant.useMutation();

  const { mutateAsync: mutateApplications } =
    trpc.application.createBulkApplications.useMutation();

  if (isLoading) return <div>Loading...</div>;

  const initialValues = {
    cv: null,
    academicRecord: null,
    personalDetails: {
      upi: '',
      AUID: '',
      email: data?.user?.email ?? '',
      currentSemesterDetails: '',
      currentlyOverseas: false,
      citizenOrPermanentResident: true,
      validWorkPermitOrVisa: false,
      otherContracts: false,
      otherContractsDescription: '',
      hasPreviousGTAContract: false,
      maxHoursPerWeek: 0,
      arrivalDate: DateTime.local().toISODate(),
    },
    courses: courses?.map((course) => ({
      id: course.id,
      name: course.name,
      grade: Grade.A_Plus,
      previousExperience: '',
      wantToTutor: false,
      wantToMark: false,
    })),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        if (!userId) return;

        try {
          const { cv, academicRecord, personalDetails, courses } = values;

          const uploadFileIfNeeded = async (
            file: Express.Multer.File,
            prefix: string
          ) => {
            if (!file) return '';
            const uploadResult = await uploadFile({
              userId,
              file,
              prefix,
            });
            return uploadResult?.Location ?? '';
          };
          if (cv === null || academicRecord === null) return;

          const [cvUploadResult, transcriptUploadResult] = await Promise.all([
            uploadFileIfNeeded(cv, 'cv'),
            uploadFileIfNeeded(academicRecord, 'unofficialTranscript'),
          ]);

          const applicantData = await mutateApplicant({
            userId: userId,
            auid: personalDetails.AUID,
            upi: personalDetails.upi,
            overseas: Boolean(personalDetails.currentlyOverseas),
            residencyStatus: personalDetails.citizenOrPermanentResident
              ? 'Resident'
              : 'Non_Resident',
            maxHours: Number(personalDetails.maxHoursPerWeek),
            cv: cvUploadResult,
            unofficialTranscript: transcriptUploadResult,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          console.log({ applicantData });
          if (!applicantData) return;

          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();

          const formattedApplications = courses?.map((course) => ({
            courseId: course.id,
            status: ApplicationStatus.Pending,
            relevantExperience: course.previousExperience,
            previousCourseGrade: course.grade,
            desiredRole: course.wantToTutor
              ? ApplicationRole.Tutor
              : ApplicationRole.Marker,
            createdAt: new Date(),
            updatedAt: new Date(),
            year: String(currentYear),
            semester: Semester.Semester1,
          }));

          if (!formattedApplications) return;

          const applicationsData = await mutateApplications({
            applicantId: applicantData.id,
            applications: formattedApplications,
          });

          console.log(applicationsData);
          if (applicationsData) {
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <>
          <FormWrapper>
            <Stack gap={3} maxHeight="75vh" overflow="scroll">
              {step === 1 && <PageOne />}
              {step === 2 && <PageTwo />}
              {step === 3 && (
                <FieldArray name="courses">
                  {({ push, remove }) => (
                    <Stack spacing={3}>
                      {formikProps.values.courses?.map((course, index) => (
                        <Stack
                          key={index}
                          spacing={3}
                          direction="row"
                          alignItems="center"
                        >
                          <PageThree index={index} course={course} />
                          <IconButton
                            aria-label="delete"
                            onClick={() => remove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      ))}
                      <Stack
                        direction="row"
                        justifyContent="left"
                        alignItems="center"
                      >
                        <AddCourseButton
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            push({
                              id: '',
                              name: '',
                              grade: '',
                              previousExperience: '',
                              wantToTutor: false,
                              wantToMark: false,
                            })
                          }
                        >
                          Add New Course
                        </AddCourseButton>
                      </Stack>
                    </Stack>
                  )}
                </FieldArray>
              )}
            </Stack>
          </FormWrapper>
          {/* {console.log(formikProps.errors)} */}
          <ErrorList currentPage={step} />
          <FormButtons
            step={step}
            setStep={setStep}
            submitForm={formikProps.handleSubmit}
          />
        </>
      )}
    </Formik>
  );
};
