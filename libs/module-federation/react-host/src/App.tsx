import { Add, Remove } from '@mui/icons-material';
import { AppBar, Card, CardContent, Container, Link, Stack, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './App.css';
import Typography from '@mui/material/Typography';
import { lazy, useState } from 'react';

import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';

const BasicReactRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('basicReactRemote/App'),
);

const MuiButtonFromRemote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('basicReactRemote/MuiButton'),
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
        <BasicReactRemote />
      </Container>
    </>
  );
}

export default App;
