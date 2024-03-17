'use client'

import { FC, useTransition } from 'react'
import Link from 'next/link'
import {
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { ButtonWithLoading } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerUser } from './action'

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    firstName: z.string().min(1, { message: 'Please enter your name' }),
    lastName: z.string().min(1, { message: 'Please enter your last name' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(16, { message: 'Password must be at most 16 characters' }),
})

const RegisterPage: FC = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        },
    })

    const onSubmit = form.handleSubmit(async data => {
        startTransition(async () => {
            try {
                await registerUser(data)
            } catch (err) {
                form.setError('root', {
                    type: 'server',
                    message: (err as Error).message,
                })
            }
        })
    })

    return (
        <>
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="First name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Last name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField name="root" render={() => <FormMessage />} />
                        <ButtonWithLoading
                            className="w-full"
                            loading={isPending}
                            type="submit"
                        >
                            Register
                        </ButtonWithLoading>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p>
                    Already have an account?{' '}
                    <Link className="text-blue-500" href="/signin">
                        Sign In
                    </Link>
                </p>
            </CardFooter>
        </>
    )
}

export default RegisterPage
