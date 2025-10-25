import { AppBar, Container, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Outlet } from '@tanstack/react-router';

import './App.css';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { lazy, useState } from 'react';

const MuiButtonFromRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('zReactRemote/MuiButton'),
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component="div"
            sx={{ flexGrow: 1 }}
            variant="h6">
            React Host
          </Typography>
          <MuiButtonFromRemote
            onClick={() => setCount((count) => count + 1)}
            variant="outlined">
            Remote MUI Button: {count}
          </MuiButtonFromRemote>
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
}

export default App;
