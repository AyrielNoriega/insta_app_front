import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import { AppRouter } from './routes/AppRouter';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <RouterProvider router={AppRouter} />
        </StyledEngineProvider>
    </StrictMode>,
)
