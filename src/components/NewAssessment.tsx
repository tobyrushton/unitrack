'use client'

import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    createAssessment,
    updateAssessment,
} from '@/app/dashboard/assessments/action'
import { resIsError } from '@/utils/resIsError'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from './ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent } from './ui/select'
import { Input } from './ui/input'
import { PopUp, PopUpFormButtons, usePopUp } from './PopUp'
import { CardHeader, CardTitle, CardContent } from './ui/card'
import { SelectListModules } from './SelectList'

interface NewAssessmentProps {
    assessment?: Omit<assessment.AssessmentId, 'userId'>
}

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' })
        .max(48, { message: 'Name can be max 48 characters' }),
    weight: z.string().refine(
        value => {
            const val = parseInt(value, 10)
            return val >= 0 && val <= 100
        },
        { message: 'Weight must be between 0 and 100' }
    ),
    date: z.string(),
    time: z.string(),
    moduleId: z.string(),
    grade: z
        .string()
        .refine(
            value => {
                const val = parseInt(value, 10)
                return val >= 0 && val <= 100
            },
            { message: 'Grade must be between 0 and 100' }
        )
        .optional(),
})

export const NewAssessment: FC<NewAssessmentProps> = ({ assessment }) => {
    const [isPending, startTransition] = useTransition()
    const { disable } = usePopUp()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: assessment?.name ?? '',
            weight: assessment?.weight.toString() ?? '',
            date: assessment?.date.toISOString().split('T')[0] ?? '',
            time:
                assessment?.date.toISOString().split('T')[1].split('.')[0] ??
                '',
            moduleId: assessment?.moduleId ?? undefined,
            grade: assessment?.grade?.toString() ?? undefined,
        },
    })

    const onSubmit = form.handleSubmit(data => {
        startTransition(async () => {
            if (assessment) {
                const res = await updateAssessment({
                    ...data,
                    id: assessment.id,
                    grade: data.grade ?? null,
                })

                if (res)
                    form.setError('root', {
                        type: 'manual',
                        message: res.error,
                    })
                else disable()
            } else {
                const res = await createAssessment({
                    ...data,
                    grade: data.grade ?? null,
                })

                if (resIsError(res)) {
                    form.setError('root', {
                        type: 'manual',
                        message: res.error,
                    })
                } else disable()
            }
        })
    })

    return (
        <PopUp>
            <CardHeader>
                <CardTitle>{assessment ? 'Edit' : 'New'} Assessment</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="input"
                                            {...field}
                                            placeholder="Name"
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
                                    <FormLabel>Weight</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="input"
                                            {...field}
                                            placeholder="Weight"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <span className="flex flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="input"
                                                {...field}
                                                type="date"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="input"
                                                {...field}
                                                placeholder="Time"
                                                type="time"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </span>
                        <FormField
                            control={form.control}
                            name="grade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grade (optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="input"
                                            {...field}
                                            placeholder="Grade"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="moduleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Module</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a module" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectListModules />
                                            </SelectContent>
                                        </Select>
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
