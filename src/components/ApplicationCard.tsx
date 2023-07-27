import { Box, Card, Typography } from '@mui/material';
import { FC, Fragment, useEffect, useState } from 'react';
import {
  MainCard,
  CourseTitleContainer,
  CardContainer,
  CardTitle,
  CardSubHeader,
  Text,
  PendingIcon,
  AcceptedIcon,
  RejectedIcon,
} from '../pageStyles/applicationCards.styled';
import { trpc } from '@/utils/trpc';
import { Application } from '@prisma/client';
import { filter } from 'lodash';

interface ApplicationCardsCourseInfo {
  applicationInfo: Application[] | undefined;
  view: number;
  value: number;
  semesterFilter?: string;
}

export const ApplicationCard: FC<ApplicationCardsCourseInfo> = ({
  applicationInfo,
  view,
  value,
  semesterFilter = 'All',
}) => {
  const [courseIDs, setCourseIDs] = useState<string[] | undefined>(undefined);
  const { data: courses } = trpc.courses.getCourse.useQuery(courseIDs ?? [], {
    enabled: !!courseIDs,
  });

  useEffect(() => {
    if (applicationInfo) {
      setCourseIDs(applicationInfo.map((application) => application.courseId));
    }
  }, [applicationInfo]);

  const addSpace = (semester: string) => {
    return 'Semester ' + semester.charAt(semester.length - 1);
  };

  if (view !== value || !applicationInfo) {
    return null;
  }

  const filteredApplications = applicationInfo.filter((application) => {
    const correspondingCourse = courses?.find(
      (course) => course.id === application.courseId
    );
    const semester =
      correspondingCourse?.semester === 'Summer_School'
        ? 'Summer School'
        : correspondingCourse?.semester;

    return semester === semesterFilter || semesterFilter === 'All';
  });

  return (
    <>
      {filteredApplications.map((application) => {
        const correspondingCourse = courses?.find(
          (course) => course.id === application.courseId
        );

        const semester =
          correspondingCourse?.semester === 'Summer_School'
            ? 'Summer School'
            : addSpace(correspondingCourse?.semester ?? '');

        return (
          <MainCard key={application.id}>
            <CourseTitleContainer>
              {correspondingCourse && (
                <>
                  <CardTitle>{correspondingCourse.name}</CardTitle>
                  <CardSubHeader>{semester}</CardSubHeader>
                </>
              )}
            </CourseTitleContainer>
            <CardContainer>
              <Box sx={{ padding: '0', margin: '0' }}>
                <Text>{`Applied Role: ${application.desiredRole}`}</Text>
              </Box>
              {application.status === 'Pending' ? (
                <PendingIcon />
              ) : application.status === 'Accepted' ? (
                <AcceptedIcon />
              ) : (
                <RejectedIcon />
              )}
            </CardContainer>
          </MainCard>
        );
      })}
    </>
  );
};
