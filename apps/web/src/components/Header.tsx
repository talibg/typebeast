import { NavLink } from 'react-router'
import { CircleUser, Menu, Circle, Braces } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import { ModeToggle } from './mode-toggle'
import { useAuth } from '../hooks/useAuth'

export const Header = () => {
    const { isAuthenticated, logout } = useAuth()

    const menuItems = [
        {
            title: 'New',
            route: '/new',
            icon: <Braces />,
        },
    ]

    return (
        <header className="sticky top-0 flex min-h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NavLink
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Circle color="#cba42b" className="h-6 w-6" />
                    <span className="sr-only">typebeast</span>
                </NavLink>
                {menuItems.map((item, i) => (
                    <Button key={i} asChild variant="destructive">
                        <NavLink
                            to={item.route}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-foreground transition-colors hover:text-foreground'
                                    : 'text-muted-foreground transition-colors hover:text-foreground'
                            }>
                            {item.icon}
                            {item.title}
                        </NavLink>
                    </Button>
                ))}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader className="px-6">
                        <Button asChild variant="destructive">
                            <NavLink
                                to="/"
                                className="flex items-center gap-2 text-lg font-semibold">
                                <Circle color="#cba42b" className="h-6 w-6" />
                                <span className="sr-only">typebeast</span>
                                <SheetTitle>typebeast</SheetTitle>
                            </NavLink>
                        </Button>
                        <SheetDescription>Start Strong</SheetDescription>
                    </SheetHeader>
                    <nav className="grid gap-6 text-lg font-medium px-6">
                        {menuItems.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.route}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-foreground transition-colors hover:text-foreground'
                                        : 'text-muted-foreground transition-colors hover:text-foreground'
                                }>
                                {item.title}
                            </NavLink>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative"></div>
                </div>
                <ModeToggle />
                {isAuthenticated && (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle user menu
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <NavLink to="profile">Profile</NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Button
                                        variant="ghost"
                                        onClick={() => logout()}>
                                        Logout
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <Button asChild>
                            <NavLink to="register">Register</NavLink>
                        </Button>
                        <Button asChild>
                            <NavLink to="login">Login</NavLink>
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}
