import { CircularProgress, Box, useTheme } from '@mui/material';

export default function Spinner() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: `${theme.palette.background.default}cc`, // ~80% opacity dark bg
        zIndex: 14000,
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.primary.main, // soft green spinner
        }}
      />
    </Box>
  );
}