import { Box, List, ListItemText, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import {
  MainCard,
  CourseTitleContainer,
  CardContainer,
  CardTitle,
  CardSubHeader,
} from '../pageStyles/applicationCards.styled';
import { trpc } from '@/utils/trpc';
import { Application, Course } from '@prisma/client';
import { ListStyle } from '@/pageStyles/myCourses.styled';

interface MyCourseCardProps {
  applicationInfo: Application[] | undefined;
  setInfo: (course: Course) => void;
}

export const MyCourseCard: FC<MyCourseCardProps> = ({
  applicationInfo,
  setInfo,
}) => {
  const [courseIDs, setCourseIDs] = useState<string[]>([]);
  const { data: courses } = trpc.courses.getCourse.useQuery(courseIDs, {
    enabled: !!courseIDs,
  });

  useEffect(() => {
    if (applicationInfo) {
      setCourseIDs(applicationInfo.map((application) => application.courseId));
    }
  }, [applicationInfo]);

  function addSpace(semester: string) {
    return 'Semester ' + semester.charAt(semester.length - 1);
  }

  if (!applicationInfo || !courses) {
    return null;
  }

  return (
    <>
      {courses.map((course, index) => {
        const semester =
          course?.semester === 'Summer_School'
            ? 'Summer School'
            : addSpace(course?.semester);

        const correspondingCourse = courses?.find(
          (course) => course.id === applicationInfo[index].courseId
        );

        return (
          <MainCard
            key={course.id}
            onClick={() => setInfo(correspondingCourse as Course)}
          >
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
                <List>
                  {correspondingCourse &&
                  correspondingCourse?.markersNeeded > 0 ? (
                    <ListStyle>
                      <ListItemText>
                        Markers Needed: {correspondingCourse?.markersNeeded}
                      </ListItemText>
                    </ListStyle>
                  ) : null}
                  {correspondingCourse &&
                  correspondingCourse?.tutorsNeeded > 0 ? (
                    <ListStyle>
                      <ListItemText>
                        Tutors Needed: {correspondingCourse?.tutorsNeeded}
                      </ListItemText>
                    </ListStyle>
                  ) : null}
                  <ListStyle>
                    <ListItemText>
                      Number of Assignments:{' '}
                      {correspondingCourse?.numberOfAssignments}
                    </ListItemText>
                  </ListStyle>
                  <ListStyle>
                    <ListItemText>
                      {`Responsibilities:
                                ${correspondingCourse?.responsibilities}`}
                    </ListItemText>
                  </ListStyle>
                </List>
              </Box>
            </CardContainer>
          </MainCard>
        );
      })}
    </>
  );
};
