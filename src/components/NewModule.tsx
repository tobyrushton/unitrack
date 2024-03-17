'use client'

import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModule } from '@/app/dashboard/modules/action'
import { CardHeader, CardTitle, CardContent } from './ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from './ui/form'
import { Input } from './ui/input'
import { PopUpFormButtons, PopUp } from './PopUp'

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be atleast 3 characters' })
        .max(48, { message: 'Name can be max 48 characters' }),
    code: z
        .string()
        .min(1, { message: 'Code must be atleast 1 characters' })
        .max(16, { message: 'Code can be max 48 characters' }),
    weight: z.string().refine(
        value => {
            const val = parseInt(value, 10)
            return val >= 0 && val <= 100
        },
        { message: 'Weight must be between 0 and 100' }
    ),
})

export const NewModule: FC = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = form.handleSubmit(async data => {
        startTransition(async () => {
            try {
                const res = await createModule(data)
                if (res) {
                    form.setError('root', {
                        type: 'server',
                        message: res.error,
                    })
                }
            } catch {
                form.setError('root', {
                    type: 'server',
                    message: 'An error occurred',
                })
            }
        })
    })

    return (
        <PopUp>
            <CardHeader>
                <CardTitle>New Module</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Module Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Module Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Module Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Module Code"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Module Weight</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Scale of 0-100"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <PopUpFormButtons loading={isPending} />
                        <FormField name="root" render={() => <FormMessage />} />
                    </form>
                </Form>
            </CardContent>
        </PopUp>
    )
}
