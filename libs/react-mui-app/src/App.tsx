import { Add, Remove } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';

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
            MUI React App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{ mt: 4 }}>
        <Box
          display="flex"
          gap={2}
          justifyContent="center"
          mb={4}>
          <Link
            href="https://vite.dev"
            target="_blank">
            <img
              alt="Vite logo"
              src={viteLogo}
              style={{ height: '80px' }}
            />
          </Link>
          <Link
            href="https://react.dev"
            target="_blank">
            <img
              alt="React logo"
              src={reactLogo}
              style={{ height: '80px' }}
            />
          </Link>
        </Box>

        <Typography
          component="h1"
          gutterBottom
          textAlign="center"
          variant="h3">
          Vite + React + MUI
        </Typography>

        <Card sx={{ maxWidth: 400, mt: 4, mx: 'auto' }}>
          <CardContent>
            <Typography
              component="h2"
              gutterBottom
              textAlign="center"
              variant="h5">
              Counter Example
            </Typography>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              mb={2}
              spacing={2}>
              <Button
                onClick={() => setCount((count) => count - 1)}
                startIcon={<Remove />}
                variant="contained">
                Decrease
              </Button>

              <Typography
                component="span"
                sx={{ minWidth: '60px', textAlign: 'center' }}
                variant="h4">
                {count}
              </Typography>

              <Button
                onClick={() => setCount((count) => count + 1)}
                startIcon={<Add />}
                variant="contained">
                Increase
              </Button>
            </Stack>

            <Typography
              color="text.secondary"
              textAlign="center"
              variant="body2">
              Edit <code>src/App.tsx</code> and save to test HMR
            </Typography>
          </CardContent>
        </Card>

        <Typography
          color="text.secondary"
          mt={4}
          textAlign="center"
          variant="body2">
          Click on the Vite and React logos to learn more
        </Typography>
      </Container>
    </>
  );
}

export default App;
