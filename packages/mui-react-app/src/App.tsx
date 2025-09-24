import { useState } from 'react'
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Box, 
  AppBar, 
  Toolbar,
  Stack,
  Link
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI React App
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          <Link href="https://vite.dev" target="_blank">
            <img src={viteLogo} style={{ height: '80px' }} alt="Vite logo" />
          </Link>
          <Link href="https://react.dev" target="_blank">
            <img src={reactLogo} style={{ height: '80px' }} alt="React logo" />
          </Link>
        </Box>
        
        <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
          Vite + React + MUI
        </Typography>
        
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
              Counter Example
            </Typography>
            
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mb={2}>
              <Button 
                variant="contained" 
                onClick={() => setCount((count) => count - 1)}
                startIcon={<Remove />}
              >
                Decrease
              </Button>
              
              <Typography variant="h4" component="span" sx={{ minWidth: '60px', textAlign: 'center' }}>
                {count}
              </Typography>
              
              <Button 
                variant="contained" 
                onClick={() => setCount((count) => count + 1)}
                startIcon={<Add />}
              >
                Increase
              </Button>
            </Stack>
            
            <Typography variant="body2" textAlign="center" color="text.secondary">
              Edit <code>src/App.tsx</code> and save to test HMR
            </Typography>
          </CardContent>
        </Card>
        
        <Typography variant="body2" textAlign="center" color="text.secondary" mt={4}>
          Click on the Vite and React logos to learn more
        </Typography>
      </Container>
    </>
  )
}

export default App
