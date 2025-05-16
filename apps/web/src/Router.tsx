import { createBrowserRouter } from 'react-router'
import { Home } from './routes/Home'
import { Register } from './routes/Register'
import { Login } from './routes/Login'
import { Profile } from './routes/Profile'
import { Public } from './layouts/Public'
import { Protected } from './layouts/Protected'
import { ErrorBoundary } from './components/ErrorBoundary'
import { authReadyPromise } from './lib/authReady'
import { Loading } from './components/Loading'
import { fetchUsers, fetchSnippets, fetchSnippetsSingle } from './api/api'
import { CreateSnippet } from './routes/CreateSnippet'
import { ViewSnippet } from './routes/ViewSnippet'

export const Router = createBrowserRouter([
    {
        path: '/',
        Component: Public,
        HydrateFallback: Loading,
        ErrorBoundary: ErrorBoundary,
        children: [
            {
                index: true,
                Component: Home,
                loader: async () => {
                    const response = await fetchSnippets()
                    const data = await response.json()
                    return data
                },
            },
            {
                path: ':snippetId',
                Component: ViewSnippet,
                loader: async ({ params }) => {
                    const response = await fetchSnippetsSingle(params.snippetId)
                    const data = await response.json()
                    return data
                },
            },
            {
                path: 'register',
                Component: Register,
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                Component: Protected,
                children: [
                    {
                        path: 'profile',
                        Component: Profile,
                        loader: async () => {
                            await authReadyPromise
                            const response = await fetchUsers()
                            const data = await response.json()
                            return data
                        },
                    },
                    {
                        path: 'new',
                        Component: CreateSnippet,
                    },
                ],
            },
        ],
    },
])
