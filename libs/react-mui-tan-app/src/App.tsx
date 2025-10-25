import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from '@tanstack/react-router';

import './App.css';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component="div"
            sx={{ flexGrow: 1 }}
            variant="h6">
            MUI React App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
