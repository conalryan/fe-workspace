import { lazy, useState } from 'react';

import reactLogo from './assets/react.svg';

import './App.css';
import viteLogo from '/vite.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Remote = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('remote/remote-app'),
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
          variant="contained"
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </Box>
      <Remote />
    </>
  );
}

export default App;
