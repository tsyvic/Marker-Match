import {
  StaffDashboard,
  Dashboard as StudentDashboard,
} from '@/components/Dashboard';
import { Button } from '@mui/material';
import { HeaderContainer } from '@/pageStyles/index.styled';
import { useSession, signIn } from 'next-auth/react';
import {
  Info,
  SurroundingBox,
  InfoTypography,
  InfoHeader,
} from '@/pageStyles/home.styled';
import { trpc } from '@/utils/trpc';
import { Role } from '@prisma/client';

export default function Home() {
  const { status, data } = useSession();
  const { data: user } = trpc.users.getUserById.useQuery(data?.user?.id ?? '');

  const isStudent = user?.role === Role.Student;
  const isAdmin = user?.role === Role.Admin;
  const isCourseCoordinator = user?.role === Role.CourseCoordinator;
  const isMarkerCoordinator = user?.role === Role.MarkerCoordinator;
  const isTutorCoordinator = user?.role === Role.TutorCoordinator;
  const isStaff =
    isCourseCoordinator || isMarkerCoordinator || isTutorCoordinator || isAdmin;

  return (
    <>
      {status === 'authenticated' ? (
        <>
          {isStudent && <StudentDashboard />}
          {isStaff && <StaffDashboard />}
        </>
      ) : (
        <HeaderContainer>
          <SurroundingBox>
            <Info>
              <InfoHeader variant="h2">2023 Semester 2</InfoHeader>
              <InfoTypography>
                We are looking for markers for 2023 semester 2, join us today
                and become a marker at the University of Auckland!
              </InfoTypography>
              <Button variant="outlined" onClick={() => signIn('google')}>
                Apply now
              </Button>
            </Info>
          </SurroundingBox>
        </HeaderContainer>
      )}
    </>
  );
}
