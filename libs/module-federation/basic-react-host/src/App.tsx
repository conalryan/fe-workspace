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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box>
        <a
          href="https://vite.dev"
          target="_blank">
          <img
            alt="Vite logo"
            className="logo"
            src={viteLogo}
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank">
          <img
            alt="React logo"
            className="logo react"
            src={reactLogo}
          />
        </a>
      </Box>
      <Typography variant="h3">Basic React Host</Typography>
      <Box className="card">
        <Button
          onClick={() => setCount((count) => count + 1)}
          variant="contained">
          count is {count}
        </Button>
      </Box>
      <BasicReactRemote />
    </>
  );
}

export default App;
