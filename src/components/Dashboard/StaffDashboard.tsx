import { useEffect, useState } from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { colors } from '@/theme';
import { Box, Button, Paper, Stack } from '@mui/material';
import { trpc } from '@/utils/trpc';
import { ExportToCsv } from 'export-to-csv';

interface CsvData {
  applicationId: string;
  year: string;
  semester: string;
  status: string;
  relevantExperience: string;
  previousCourseGrade: string;
  desiredRole: string;
  applicantId: string;
  overseas: boolean;
  overseasReturnDate: string;
  residencyStatus: string;
  altContact: string;
  maxHours: number;
  cv: string;
  unofficialTranscript: string;
  userId: string;
  email: string;
  name: string;
}

const DownloadButton = () => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const { data: appliedStudentsQuery } =
    trpc.application.getCurrentAppliedStudents.useQuery();
  console.log(appliedStudentsQuery);
  useEffect(() => {
    if (appliedStudentsQuery) {
      const flatData = appliedStudentsQuery.map((application) => {
        return {
          applicationId: application.id,
          name: application.Applicant?.user.name ?? '',
          course: application.courses[0].course.name,
          semester: application.semester,
          year: application.year,
          status: application.status,
          relevantExperience: application.relevantExperience,
          previousCourseGrade: application.previousCourseGrade,
          desiredRole: application.desiredRole,
          applicantId: application.Applicant.id,
          overseas: application.Applicant.overseas,
          overseasReturnDate: application.Applicant.overseasReturnDate
            ? application.Applicant.overseasReturnDate.toISOString()
            : '',
          residencyStatus: application.Applicant.residencyStatus,
          altContact: application.Applicant?.altContact ?? '',
          maxHours: application.Applicant.maxHours,
          cv: application.Applicant.cv ?? '',
          unofficialTranscript:
            application.Applicant.unofficialTranscript ?? '',
          userId: application.Applicant.user.id,
          email: application.Applicant.user.email,
        };
      });
      setCsvData(flatData);
    }
  }, [appliedStudentsQuery]);

  const handleDownload = () => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Students Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Student application',
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(csvData);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
      Download CSV
    </Button>
  );
};

export default DownloadButton;

export const StaffDashboard = () => {
  return (
    <Box
      sx={{
        height: '100vh',
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
            height: '100%',
            flexGrow: 1,
            backgroundColor: colors.stone10,
            maxWidth: '100vw',
            padding: '4vh 3vw',
          }}
        >
          <Stack justifyContent="top" alignItems="center" overflow="scroll">
            <DownloadButton />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
