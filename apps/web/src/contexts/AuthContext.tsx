import { createContext } from 'react'

export type UserType = {
    id: number
    email: string
    role: 'admin' | 'user'
}

export type AuthContextType = {
    user: UserType | null
    token: string | null
    logout: () => Promise<void>
    login: (email: string, passwoord: string) => Promise<void>
    register: (
        username: string,
        email: string,
        password: string,
    ) => Promise<void>
    tryRefreshToken: () => Promise<void>
    isAuthenticated: boolean
    isAdmin: boolean
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)
