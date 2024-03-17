'use client'

import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { createCalendarEntry } from '@/app/dashboard/calendar/action'
import { CardHeader, CardTitle, CardContent } from './ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from './ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent } from './ui/select'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { PopUpFormButtons, PopUp } from './PopUp'

const formSchema = z
    .object({
        title: z
            .string()
            .min(3, { message: 'Title must be atleast 3 characters' })
            .max(48, { message: 'Title can be max 48 characters' }),
        date: z.string().refine(value => dayjs(value).isAfter(dayjs(), 'day'), {
            message: 'Date must be in the future',
        }),
        start: z.string(),
        end: z.string(),
        description: z
            .string()
            .max(256, { message: 'Description can be max 256 characters' })
            .optional(),
        assignmentId: z.string().optional(),
    })
    .superRefine((data, context) => {
        if (data.start >= data.end)
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'End time must be after start time',
                path: ['end'],
            })
    })

export const CalendarNewEntry: FC = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = form.handleSubmit(async data => {
        startTransition(async () => {
            try {
                await createCalendarEntry(data)
            } catch {
                form.setError('root', {
                    type: 'server',
                    message: 'Unable to create entry.',
                })
            }
        })
    })

    return (
        <PopUp>
            <CardHeader>
                <CardTitle>New Entry</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-4 gap-1">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="start"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="end"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="assignmentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assignment</FormLabel>
                                    <Select
                                        name={field.name}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* TODO: Implement fetch for assignments */}
                                        </SelectContent>
                                    </Select>
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
