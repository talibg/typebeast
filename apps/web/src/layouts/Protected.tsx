import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Loading } from '../components/Loading'

export const Protected = () => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <Loading />

    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <Outlet />
}
