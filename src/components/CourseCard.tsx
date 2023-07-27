import { FC, useState } from 'react';
import {
  CourseTitleContainer,
  CourseCardTitle,
  CourseCardSubHeader,
  CourseCard,
  ListStyle,
  CardContent,
} from '../pageStyles/courseCards.styled';
import { List, ListItemText } from '@mui/material';
import Dialog from './Dialog';
import { Course } from '@prisma/client';
interface CourseCardsCourseInfo {
  courseInfo: Course;
  onSelectCourse: (course: Course) => void;
  selected: boolean;
}

export const CourseCards: FC<CourseCardsCourseInfo> = ({
  courseInfo,
  onSelectCourse,
  selected,
}) => {
  const addSpace = (text: string) => {
    const number = text.at(text.length - 1);
    return 'Semester ' + number;
  };
  // eslint-disable-next-line prettier/prettier
  return (
    <>
      <CourseCard
        onClick={() => {
          onSelectCourse(courseInfo);
        }}
        selected={selected}
      >
        <CardContent>
          <CourseTitleContainer>
            <CourseCardTitle>{courseInfo.name}</CourseCardTitle>
            <CourseCardSubHeader>
              {courseInfo.semester == 'Summer_School'
                ? 'Summer School'
                : addSpace(courseInfo.semester)}
            </CourseCardSubHeader>
          </CourseTitleContainer>
          <List>
            {courseInfo.markersNeeded > 0 ? (
              <ListStyle>
                <ListItemText>
                  Markers Needed: {courseInfo.markersNeeded}
                </ListItemText>
              </ListStyle>
            ) : null}
            {courseInfo.tutorsNeeded > 0 ? (
              <ListStyle>
                <ListItemText>
                  Tutors Needed: {courseInfo.tutorsNeeded}
                </ListItemText>
              </ListStyle>
            ) : null}
            <ListStyle>
              <ListItemText>
                Number of Assignments: {courseInfo.numberOfAssignments}
              </ListItemText>
            </ListStyle>
            <ListStyle>
              <ListItemText>
                {`Responsibilities:
                            ${courseInfo.responsibilities}`}
              </ListItemText>
            </ListStyle>
          </List>
        </CardContent>
      </CourseCard>
    </>
  );
};
