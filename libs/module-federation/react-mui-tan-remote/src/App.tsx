import { Box, Link, Typography } from '@mui/material';
import Card from '@mui/material/Card/Card';
import { Outlet } from '@tanstack/react-router';

import './App.css';
import { lazy, useState } from 'react';

import reactLogo from './assets/react.svg';
import MuiButton from './components/MuiButton';

import viteLogo from '/vite.svg';

const SharedComponent = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => import('reactMuiTanHost/SharedComponent'),
  // Example of how to import a named export instead of default export
  // const TheComponent = lazy(
  //   async () => {
  //     // @ts-expect-error Module federation remote import not recognized by TypeScript
  //     const { SharedComponent } = await import('reactMuiTanHost/SharedComponent');
  //     return { default: SharedComponent };
  //   },
  // );
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Card sx={{ marginBottom: 2, padding: 2 }}>
        <Box>
          <Link
            href="https://vite.dev"
            target="_blank">
            <img
              alt="Vite logo"
              className="logo"
              src={viteLogo}
            />
          </Link>
          <Link
            href="https://react.dev"
            target="_blank">
            <img
              alt="React logo"
              className="logo react"
              src={reactLogo}
            />
          </Link>
        </Box>
        <Typography variant="h3">Z React Remote</Typography>
        <MuiButton onClick={() => setCount((count) => count + 1)}>count is {count}</MuiButton>
      </Card>
      <SharedComponent />
      <Outlet />
    </>
  );
}

/** default export for module federation */
export default App;
