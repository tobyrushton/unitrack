'use server'

import { client } from '@/server/db/client'
import { validateRequest } from '@/server/auth/validateRequest'
import dayjs from 'dayjs'

interface NewCalendarEntry {
    title: string
    description?: string
    date: string
    start: string
    end: string
    assessmentId?: string
}

export const createCalendarEntry = async (
    data: NewCalendarEntry
): Promise<void | { error: string }> => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const start = dayjs(`${data.date} ${data.start}`)
    const end = dayjs(`${data.date} ${data.end}`)
    if (end.isBefore(start)) {
        return { error: 'End time must be after start time' }
    }

    await client.calendarItem.create({
        data: {
            title: data.title,
            description: data.description,
            start: start.toISOString(),
            end: end.toISOString(),
            assessmentId: data.assessmentId,
            userId: user.id,
            moduleId: '1',
        },
    })

    return undefined
}
