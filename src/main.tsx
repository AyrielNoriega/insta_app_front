import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

import { AppRouter } from './routes/AppRouter';
import AppTheme from './theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <AppTheme>
                <CssBaseline enableColorScheme />

                <AppAppBar />
                <Container
                    maxWidth="lg"
                    component="main"
                    sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
                >
                    <RouterProvider router={AppRouter} />
                </Container>
                <Footer />
            </AppTheme>
        </StyledEngineProvider>
    </StrictMode>,
)
