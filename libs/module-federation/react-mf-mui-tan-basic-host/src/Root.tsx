import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Root = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography
          component="div"
          sx={{ flexGrow: 1 }}
          variant="h6">
          React MUI Tan Basic Host
        </Typography>
      </Toolbar>
    </AppBar>

    <Container
      maxWidth="md"
      sx={{ mt: 4 }}>
      <Outlet />
      <TanStackRouterDevtools />
    </Container>
  </>
);
