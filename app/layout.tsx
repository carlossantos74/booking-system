import './styles/globals.css';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { EventAvailable } from '@mui/icons-material';

import { Providers } from '@/lib/providers';
import { Nav } from './components/Nav';


export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>Booking system</title>
        </head>
        <body>
          <AppBar component="header">
            <Toolbar 
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <EventAvailable sx={{ mr: 2 }} />
              <Nav />
            </Toolbar>
          </AppBar>
          <Box 
            component="main" 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
            }}
          >
            <Toolbar />
            
            {props.children}
          </Box>
        </body>
      </html>
    </Providers>
  )
}
