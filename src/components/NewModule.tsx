'use client'

import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModule, updateModule } from '@/app/dashboard/modules/action'
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
import { PopUpFormButtons, PopUp, usePopUp } from './PopUp'

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be atleast 3 characters' })
        .max(48, { message: 'Name can be max 48 characters' }),
    code: z
        .string()
        .min(1, { message: 'Code must be atleast 1 characters' })
        .max(16, { message: 'Code can be max 48 characters' }),
    credits: z.string().refine(
        value => {
            const val = parseInt(value, 10)
            return val > 0
        },
        { message: 'Credits must be above 0' }
    ),
})

interface NewModuleProps {
    module?: {
        id: string
        name: string
        code: string
        credits: number
    }
}

export const NewModule: FC<NewModuleProps> = ({ module }) => {
    const [isPending, startTransition] = useTransition()
    const { disable } = usePopUp()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...module,
            credits: module?.credits.toString() ?? '',
        },
    })

    const onSubmit = form.handleSubmit(async data => {
        startTransition(async () => {
            try {
                const res = module
                    ? await updateModule({ ...data, id: module.id })
                    : await createModule(data)
                if (res) {
                    form.setError('root', {
                        type: 'server',
                        message: res.error,
                    })
                } else disable()
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
                            name="credits"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Module Credits</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Number of credits module is worth"
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
