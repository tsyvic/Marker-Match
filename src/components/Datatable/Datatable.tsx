import * as React from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { trpc } from '@/utils/trpc';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Student Name', flex: 1 },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    valueGetter: (params) => params.row.email,
  },
  {
    field: 'desiredRole',
    headerName: 'Desired Role',
    flex: 1,
    valueGetter: (params) => params.row.application?.desiredRole,
  },
  {
    field: 'assignedHours',
    headerName: 'Assigned Hours',
    flex: 1,
    valueGetter: (params) => params.row.applicant?.assignedHours,
  },
  {
    field: 'maxHours',
    headerName: 'Max Hours',
    flex: 1,
    valueGetter: (params) => params.row.applicant?.maxHours,
  },
  {
    field: 'applications',
    headerName: 'Pending Applications',
    flex: 2,
    renderCell: (params) => {
      const applications = params.row.applications || [];
      const pendingApplications = applications.filter(
        (application: any) => application?.status === 'Pending'
      );

      return (
        <ul>
          {pendingApplications.map((application: any) => (
            <li key={application.id}>
              {application.course?.name}: {application.course?.hours}
            </li>
          ))}
        </ul>
      );
    },
  },
  { field: 'suitabilityStatus', headerName: 'Suitability Status', flex: 1 },

  {
    field: 'applicantInfo',
    headerName: 'Applicant Info',
    flex: 2,
    renderCell: (params) => {
      const applicant = params.row.applicant;
      if (applicant) {
        return (
          <div>
            <p>Overseas: {applicant.overseas ? 'Yes' : 'No'}</p>
            <p>Residency Status: {applicant.residencyStatus}</p>
            <p>Max Hours: {applicant.maxHours}</p>
          </div>
        );
      }
      return null;
    },
  },
];

export default function DataTable() {
  const [tabIndex, setTabIndex] = useState(0);
  const [studentsData, setStudentsData] = useState<GridRowsProp>([]);

  const { data: userData } = trpc.users.getAllStudentUsers.useQuery();

  useEffect(() => {
    // Fetch data from your endpoint
    const fetchData = async () => {
      const transformedData =
        userData?.map((user: any) => {
          const applicant = user.applicants[0] || null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accounts: user.accounts,
            sessions: user.sessions,
            applications: user.applications.map(
              (userApplication: any) => userApplication.application
            ),
            contracts: user.contracts,
            courses: user.courses,
            admins: user.admins,
            courseCoordinators: user.courseCoordinators,
            tutors: user.tutors,
            markers: user.markers,
            // Add the applicant information here
            applicant: applicant
              ? {
                  id: applicant.id,
                  overseas: applicant.overseas,
                  overseasReturnDate: applicant.overseasReturnDate,
                  residencyStatus: applicant.residencyStatus,
                  altContact: applicant.altContact,
                  maxHours: applicant.maxHours,
                  cv: applicant.cv,
                  unofficialTranscript: applicant.unofficialTranscript,
                  upi: applicant.upi,
                  auid: applicant.auid,
                  applications: applicant.Applications,
                }
              : null,
          };
        }) || [];
      setStudentsData(transformedData);
    };
    fetchData();
  }, [userData]);

  console.log(userData);

  const handleTabChange = (
    event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Year 3" />
        <Tab label="Year 2" />
        <Tab label="Year 1" />
        <Tab label="All" />
      </Tabs>
      <DataGridPro rows={studentsData} columns={columns} checkboxSelection />
    </div>
  );
}
