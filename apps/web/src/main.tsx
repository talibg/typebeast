import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Router } from './Router'
import { ThemeProvider } from './contexts/ThemeProvider'
import './index.css'
import { AuthProvider } from './contexts/AuthProvider'
import { fetchInterceptor } from './lib/fetchInterceptor'
import { Toaster } from 'sonner'

const root = document.getElementById('root')

fetchInterceptor()

createRoot(root!).render(
    <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={Router} />
            <Toaster richColors position="top-center" />
        </ThemeProvider>
    </AuthProvider>,
)
