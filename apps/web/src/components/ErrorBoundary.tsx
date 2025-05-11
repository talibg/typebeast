import { Bomb } from 'lucide-react'
import { NavLink } from 'react-router'

export const ErrorBoundary = () => {
    return (
        <div className="w-full flex-auto grow flex flex-col justify-center items-center content-center px-8">
            <Bomb className="h-[100px] w-[100px]" />
            <NavLink to="/" className="underline p-4">
                home
            </NavLink>
        </div>
    )
}
