import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Navigate, NavLink } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { InputField } from '../components/forms/InputField'
import { FormCard } from '../components/FormCard'

const formSchema = z.object({
    username: z.string(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
})

export const Login = () => {
    const { login, isAuthenticated } = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { username, password } = values
            await login(username, password)
            toast.success('welcome back')
        } catch {
            toast.error('Failed to submit the form. Please try again.')
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/profile" />
    }

    return (
        <div className="w-full flex-auto grow flex flex-col justify-center items-center content-center px-8">
            <FormCard
                title="Login"
                description="Enter your email and password to login to your account.">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="grid gap-4">
                            <InputField
                                control={form.control}
                                name="username"
                                label="username"
                                placeholder="typebeast"
                                type="text"
                            />
                            <InputField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="********"
                                type="password"
                                autoComplete="current-password"
                            />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <NavLink to="/register" className="underline">
                        Sign up
                    </NavLink>
                </div>
            </FormCard>
        </div>
    )
}
