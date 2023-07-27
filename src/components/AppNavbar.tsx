import { useState } from 'react';
import { Stack, Box, Avatar, Typography } from '@mui/material';
import avatar from '../assets/avatarPlaceholder.jpg';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CreateIcon from '@mui/icons-material/Create';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  iconStyle,
  boxStyle,
  text,
  innerBoxStyle,
} from '@/pageStyles/appNavbar.styled';
import { Navigation } from './Navigation/Navigation';
import Link from 'next/link';
import { UOAIcon } from '@/assets/UOAIcon';
import { NavigationLinks } from './Navigation/NavigationLinks';
import { NavigationLink } from './Navigation/NavigationLink';
import { NavProfile } from './Navigation/NavProfile';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { NavigationFooter } from './Navigation/NavigationFooter';
import LogoutIcon from '@mui/icons-material/Logout';
import { trpc } from '@/utils/trpc';
import { Role } from '@prisma/client';

export const AppNavbar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [smsOpen, setSmsOpen] = useState(false);
  const atHomePage = router.pathname === '/';
  const isActiveRoute = (startsWith: string, smsOpen: boolean) => {
    return !smsOpen && router.pathname.startsWith(`/${startsWith}`);
  };

  const { data: user } = trpc.users.getUserById.useQuery(
    sessionData?.user?.id ?? ''
  );

  const isStudent = user?.role === Role.Student;
  const isAdmin = user?.role === Role.Admin;
  const isCourseCoordinator = user?.role === Role.CourseCoordinator;
  const isMarkerCoordinator = user?.role === Role.MarkerCoordinator;
  const isTutorCoordinator = user?.role === Role.TutorCoordinator;
  const isStaff =
    isCourseCoordinator || isMarkerCoordinator || isTutorCoordinator || isAdmin;

  const marker = () => {
    return (
      <Box sx={innerBoxStyle}>
        <AssignmentTurnedInIcon sx={iconStyle}></AssignmentTurnedInIcon>
        <Typography sx={text}>Markers</Typography>
      </Box>
    );
  };
  const tutor = () => {
    return (
      <Box sx={innerBoxStyle}>
        <CreateIcon sx={iconStyle}></CreateIcon>
        <Typography sx={text}>Tutors</Typography>
      </Box>
    );
  };
  return (
    <Navigation
      logo={
        <Link href="/">
          <UOAIcon
            sx={{
              fontSize: 120,
              height: 70,
            }}
          />
        </Link>
      }
    >
      <Box p={3} pb={2} pt={0} onClick={() => setSmsOpen(false)}>
        <NavProfile
          name={sessionData?.user?.name}
          enableProfileLink={true}
          active={isActiveRoute('profile', smsOpen)}
          image={sessionData?.user?.image || ''}
        />
      </Box>
      <NavigationLinks>
        {isStudent && (
          <>
            <NavigationLink
              to="/"
              title="Courses"
              icon={<LibraryBooksIcon />}
              active={!smsOpen && atHomePage}
              onClick={() => setSmsOpen(false)}
            />
            <NavigationLink
              to="/my-applications"
              title="My Applications"
              icon={<LibraryBooksIcon />}
              active={isActiveRoute('my-applications', smsOpen)}
              onClick={() => setSmsOpen(false)}
            />
            <NavigationLink
              to="/my-courses"
              title="My Courses"
              icon={<LibraryBooksIcon />}
              active={isActiveRoute('recordings', smsOpen)}
              onClick={() => setSmsOpen(false)}
            />
          </>
        )}
        {isStaff && (
          <>
            <NavigationLink
              to="/"
              title="Student Applications"
              icon={<LibraryBooksIcon />}
              active={!smsOpen && atHomePage}
              onClick={() => setSmsOpen(false)}
            />
            <NavigationLink
              to="/courses-management"
              title="Courses Management"
              icon={<LibraryBooksIcon />}
              active={isActiveRoute('courses-management', smsOpen)}
              onClick={() => setSmsOpen(false)}
            />
          </>
        )}
      </NavigationLinks>
      <NavigationFooter>
        <NavigationLink
          icon={<LogoutIcon />}
          title="Logout"
          onClick={() => signOut()}
        />
      </NavigationFooter>
    </Navigation>
  );
};
