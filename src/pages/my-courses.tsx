import { AppNavbar } from '@/components/AppNavbar';
import {
  CourseCardContainer,
  CourseInfo,
  CourseTitleContainer,
  CourseCardTitle,
  CourseCardSubHeader,
  ListStyle,
} from '@/pageStyles/myCourses.styled';
import { Box, List, ListItemText, Paper, Typography } from '@mui/material';
import { useApplicantApplications } from '@/hooks';
import { MyCourseCard } from '@/components/MyCourseCard';
import { colors } from '@/theme';
import { Application, Course } from '@prisma/client';
import { useState } from 'react';

export default function MyCourses() {
  const { loading, applicantApplications, applicant } =
    useApplicantApplications();
  const acceptedApplications = applicantApplications?.filter(
    (application) => application.status === 'Accepted'
  );
  const [info, setInfo] = useState<Course | null>();
  function addSpace(semester: string) {
    if (semester) return 'Semester ' + semester.charAt(semester.length - 1);
    return null;
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <AppNavbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Paper
          square
          sx={{
            flexGrow: 1,
            backgroundColor: colors.stone10,
            maxWidth: '100vw',
            padding: '2vh 2vw',
          }}
        >
          <Typography variant="h2">My Courses</Typography>
          <CourseCardContainer>
            <CourseCardContainer>
              <MyCourseCard
                applicationInfo={acceptedApplications}
                setInfo={setInfo}
              ></MyCourseCard>
            </CourseCardContainer>
            <CourseInfo>
              <CourseTitleContainer>
                <CourseCardTitle>{info?.name}</CourseCardTitle>
                <CourseCardSubHeader>
                  {info?.semester == 'Summer_School'
                    ? 'Summer School'
                    : addSpace(info?.semester ?? 'Unknown')}
                </CourseCardSubHeader>
              </CourseTitleContainer>
              {info ? (
                <>
                  <List>
                    <ListStyle>
                      <ListItemText>{info?.description}</ListItemText>
                    </ListStyle>
                    <ListStyle>
                      <ListItemText>{`Markers: ${info?.markersNeeded}/${info?.maxNoMarkers}`}</ListItemText>
                    </ListStyle>
                    <ListStyle>
                      <ListItemText>{`Tutors: ${info?.tutorsNeeded}/${info?.maxNoTutors}`}</ListItemText>
                    </ListStyle>
                    <ListStyle>
                      <ListItemText>{`Students Enrolled: ${info?.enrolledStudents}`}</ListItemText>
                    </ListStyle>
                    <ListStyle>
                      <ListItemText>{`Number of Assignments: ${info?.numberOfAssignments}`}</ListItemText>
                    </ListStyle>
                    <ListStyle>
                      <ListItemText>{`Responsibilities: ${info?.responsibilities}`}</ListItemText>
                    </ListStyle>
                  </List>
                </>
              ) : (
                <CourseCardTitle>Select a course</CourseCardTitle>
              )}
            </CourseInfo>
          </CourseCardContainer>
        </Paper>
      </Box>
    </Box>
  );
}
