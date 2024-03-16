'use client'

import { FC, useTransition } from 'react'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ButtonWithLoading } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signUserIn } from './action'

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string(),
})

const SignInPage: FC = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = form.handleSubmit(async data => {
        startTransition(async () => {
            signUserIn(data)
        })
    })

    return (
        <div>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
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
                                        <Input
                                            type="email"
                                            placeholder="Email"
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
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <ButtonWithLoading
                            className="w-full"
                            type="submit"
                            loading={isPending}
                        >
                            Sign In
                        </ButtonWithLoading>
                    </form>
                </Form>
            </CardContent>
        </div>
    )
}

export default SignInPage
