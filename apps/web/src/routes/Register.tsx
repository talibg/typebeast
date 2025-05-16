import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { NavLink, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { InputField } from '../components/forms/InputField'
import { FormCard } from '../components/FormCard'

const formSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters long' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    })

export const Register = () => {
    const { register, isAuthenticated } = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { username, email, password } = values
            await register(username, email, password)
            toast.success('Welcome')
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
                title="Register"
                description="Create a new account by filling out the form below.">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="grid gap-4">
                            <InputField
                                control={form.control}
                                name="username"
                                label="Username"
                                placeholder="username"
                                type="text"
                            />
                            <InputField
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="example@email.com"
                                type="email"
                                autoComplete="email"
                            />
                            <InputField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="********"
                                type="password"
                                autoComplete="new-password"
                            />
                            <InputField
                                control={form.control}
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="********"
                                type="password"
                                autoComplete="new-password"
                            />
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <NavLink to="/login" className="underline">
                        Login
                    </NavLink>
                </div>
            </FormCard>
        </div>
    )
}
