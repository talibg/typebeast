import { Braces, Power } from 'lucide-react'
import { NavLink } from 'react-router'
import { Button } from './ui/button'

export const PowerOn = () => {
    return (
        <div className="w-full flex-auto grow flex flex-col justify-center items-center content-center px-8">
            <Power className="h-[100px] w-[100px]" />
            <div className="p-4">
                <h1 className="text-xl">
                    typebeast - Hype Code For TypeScript Artists
                </h1>
            </div>
            <Button asChild variant="destructive">
                <NavLink
                    to="/new"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-foreground transition-colors hover:text-foreground'
                            : 'text-muted-foreground transition-colors hover:text-foreground'
                    }>
                    <Braces />
                    Be The First
                </NavLink>
            </Button>
        </div>
    )
}
