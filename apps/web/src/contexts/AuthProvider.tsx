import {
    useState,
    useEffect,
    useMemo,
    useCallback,
    PropsWithChildren,
} from 'react'
import { AuthContext, UserType } from '../contexts/AuthContext'
import { storeManager, type StoreType } from '../lib/store'
import { signalAuthReady, signalAuthFailure } from '../lib/authReady'
import {
    deleteSessions,
    getSession,
    postSessions,
    postUsers,
} from '../api/api.ts'

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleSetStore = useCallback(({ token, user }: StoreType) => {
        if (token && user) storeManager.setStore({ token, user })
        if (!token && !user) storeManager.clearStore()
        setAuthToken(token)
        setUser(user)
    }, [])

    const tryRefreshToken = useCallback(async () => {
        setIsLoading(true)
        let refreshSuccess = false
        try {
            const response = await getSession()

            if (!response.ok) {
                handleSetStore({ token: null, user: null })
                refreshSuccess = false
            }

            const data = await response.json()
            handleSetStore({ token: data.accessToken, user: data.user })
            refreshSuccess = true
        } catch (error) {
            handleSetStore({ token: null, user: null })
            signalAuthFailure(error)
            refreshSuccess = false
        } finally {
            signalAuthReady(refreshSuccess)
            setIsLoading(false)
        }
    }, [handleSetStore])

    useEffect(() => {
        tryRefreshToken()
    }, [tryRefreshToken])

    const register = useCallback(
        async (username: string, email: string, password: string) => {
            setIsLoading(true)
            const response = await postUsers(username, email, password)

            if (!response.ok) {
                setIsLoading(false)
                return
            }
            const data = await response.json()
            console.log(data)
            handleSetStore({ token: data.accessToken, user: data.user })
            setIsLoading(false)
        },
        [handleSetStore],
    )

    const login = useCallback(
        async (email: string, password: string) => {
            setIsLoading(true)
            const response = await postSessions(email, password)
            if (!response.ok) throw new Error('Login failed')
            const data = await response.json()
            handleSetStore({ token: data.accessToken, user: data.user })
            setIsLoading(false)
        },
        [handleSetStore],
    )

    const logout = useCallback(async () => {
        try {
            const response = await deleteSessions()
            if (!response.ok) throw new Error('Logout failed')
            handleSetStore({ token: null, user: null })
        } catch (error) {
            console.error('AuthProvider: Error calling logout endpoint:', error)
        }
    }, [handleSetStore])

    const contextValue = useMemo(
        () => ({
            user,
            token: authToken,
            logout,
            login,
            register,
            tryRefreshToken,
            isAuthenticated: !!authToken,
            isAdmin: user?.role === 'admin',
            isLoading,
        }),
        [user, authToken, isLoading, logout, login, register, tryRefreshToken],
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
