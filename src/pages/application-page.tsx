import { ApplicationPage } from '@/components/ApplicationPage';
import { AppNavbar } from '@/components/AppNavbar';
import { Box, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <AppNavbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
        height="100vh"
      >
        <Stack gap={6} padding={4} alignItems="center" height="100%">
          <Typography
            display="flex"
            align="center"
            justifyContent="center"
            variant="h3"
          >
            Application
          </Typography>
          <ApplicationPage />
        </Stack>
      </Box>
    </Box>
  );
}
