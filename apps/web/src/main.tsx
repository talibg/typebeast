import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Router } from './Router'
import { ThemeProvider } from '@/components/theme-provider'
import './index.css'
import { AuthProvider } from './contexts/AuthProvider'
import { fetchInterceptor } from './contexts/fetch-interceptor'
import { Toaster } from 'sonner'

const root = document.getElementById('root')

fetchInterceptor()

createRoot(root!).render(
    <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={Router} />
            <Toaster />
        </ThemeProvider>
    </AuthProvider>,
)
