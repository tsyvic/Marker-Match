import { useState, useEffect } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { AppNavbar } from '@/components/AppNavbar';
import { Body, MainContainer, MainBody } from '@/pageStyles/global.styled';
import { ApplicationContainer } from '../pageStyles/myApplications.styled';
import { ApplicationCard } from '@/components/ApplicationCard';
import { useApplicantApplications } from '@/hooks';

export default function MyApplications() {
  const { applicantApplications, applicant } = useApplicantApplications();
  const [viewApplicationStatus, setViewApplicationStatus] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const savedTabOption = localStorage.getItem('selectedTab');
      return savedTabOption ? Number(savedTabOption) : 0;
    }
    return 0; // Fallback if localStorage is not available
  });

  // Load the selected tab option from localStorage on initial render
  useEffect(() => {
    const savedTabOption = localStorage.getItem('selectedTab');
    if (savedTabOption) {
      setViewApplicationStatus(Number(savedTabOption));
    }
  }, []);

  // Save the selected tab option to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedTab', viewApplicationStatus.toString());
  }, [viewApplicationStatus]);

  const pendingApplications = applicantApplications?.filter(
    (application) => application.status === 'Pending'
  );
  const acceptedApplications = applicantApplications?.filter(
    (application) => application.status === 'Accepted'
  );
  const rejectedApplications = applicantApplications?.filter(
    (application) => application.status === 'Rejected'
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setViewApplicationStatus(newValue);
  };

  return (
    <Body>
      <AppNavbar />
      <MainContainer>
        <Paper square sx={MainBody}>
          <Typography variant="h2">My Applications</Typography>
          <Box>
            <Tabs value={viewApplicationStatus} onChange={handleChange}>
              <Tab sx={{ color: '#1D1E2B' }} label="All" />
              <Tab sx={{ color: '#555555' }} label="Pending" />
              <Tab sx={{ color: '#03C03C' }} label="Accepted" />
              <Tab sx={{ color: '#ED2939' }} label="Rejected" />
            </Tabs>
          </Box>
          <ApplicationContainer>
            <ApplicationCard
              applicationInfo={applicantApplications}
              view={0}
              value={viewApplicationStatus}
            />
            <ApplicationCard
              applicationInfo={pendingApplications}
              view={1}
              value={viewApplicationStatus}
            />
            <ApplicationCard
              applicationInfo={acceptedApplications}
              view={2}
              value={viewApplicationStatus}
            />
            <ApplicationCard
              applicationInfo={rejectedApplications}
              view={3}
              value={viewApplicationStatus}
            />
          </ApplicationContainer>
        </Paper>
      </MainContainer>
    </Body>
  );
}
