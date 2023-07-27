import { AppNavbar } from '@/components/AppNavbar';
import { colors } from '@/theme';
import { Box, Paper, Typography, Input, Button } from '@mui/material';
import { useState } from 'react';
import {
  SearchBar,
  SearchBarIcon,
  FilterSelectionContainer,
  ControlContainer,
  CourseCardContainer,
} from '@/pageStyles/dashboard.styled';
import { CourseCards } from '@/components/CourseCard';
import { trpc } from '@/utils/trpc';
import { Course } from '@prisma/client';
import { useRouter } from 'next/router';

export const Dashboard = () => {
  const router = useRouter();
  const [courseName, setCourseName] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const { data: searchedCourses } =
    trpc.courses.searchCourses.useQuery(courseName);

  const { data: allCourses } = trpc.courses.getCurrentCourses.useQuery();

  const courses = courseName ? searchedCourses : allCourses;

  const handleCourseSelection = (course: Course) => {
    setSelectedCourses((prevSelectedCourses) => {
      const courseIndex = prevSelectedCourses.findIndex(
        (selectedCourse) => selectedCourse.id === course.id
      );
      if (courseIndex !== -1) {
        // Course already selected, remove it from the selected list
        const updatedSelectedCourses = [...prevSelectedCourses];
        updatedSelectedCourses.splice(courseIndex, 1);
        return updatedSelectedCourses;
      } else {
        // Course not selected, add it to the selected list
        return [...prevSelectedCourses, course];
      }
    });
  };

  const SearchCourse = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setCourseName(searchWord);
  };

  const handleApply = () => {
    if (selectedCourses.length > 0) {
      const selectedCourseIds = selectedCourses.map((course) =>
        course.id.toString()
      );
      const queryParams = new URLSearchParams({
        courseIds: selectedCourseIds.join(','),
      });
      const url = `/application-page?${queryParams.toString()}`;
      router.push(url);
    }
  };

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
          <Typography variant="h2">Courses</Typography>
          <ControlContainer>
            <SearchBar>
              <SearchBarIcon />
              <Input
                placeholder="Search Courses"
                onChange={SearchCourse}
                value={courseName}
                disableUnderline
                sx={{
                  backgroundColor: 'transparent',
                }}
              />
            </SearchBar>
            <FilterSelectionContainer>
              {selectedCourses && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApply}
                >
                  Apply
                </Button>
              )}
            </FilterSelectionContainer>
          </ControlContainer>
          <CourseCardContainer>
            <>
              {courses?.map((course, key) => (
                <CourseCards
                  key={key}
                  courseInfo={course}
                  onSelectCourse={handleCourseSelection}
                  selected={selectedCourses.some(
                    (selectedCourse) => selectedCourse.id === course.id
                  )}
                />
              ))}
            </>
          </CourseCardContainer>
        </Paper>
      </Box>
    </Box>
  );
};
