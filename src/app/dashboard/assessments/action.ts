'use server'

import { validateRequest } from '@/server/auth/validateRequest'
import { client } from '@/server/db/client'
import dayjs from 'dayjs'

export const createAssessment = async (
    data: Omit<assessment.Assessment, 'userId'> & { time: string }
): Promise<void | { error: string }> => {
    const { user } = await validateRequest()

    if (!user) return { error: 'Unauthorized' }

    try {
        await client.assessment.create({
            data: {
                ...data,
                userId: user.id,
                date: dayjs(`${data.date} ${data.time}`).toISOString(),
            },
        })
    } catch {
        return { error: 'Error creating assessment. Please try again.' }
    }
    return undefined
}
