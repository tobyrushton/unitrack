'use server'

import { validateRequest } from '@/server/auth/validateRequest'
import { client } from '@/server/db/client'
import dayjs from 'dayjs'

export const createAssessment = async (
    data: Omit<
        assessment.Assessment,
        'userId' | 'grade' | 'weight' | 'date'
    > & {
        time: string
        weight: string
        grade: string | null
        date: string
    }
): Promise<assessment.AssessmentId | { error: string }> => {
    const { user } = await validateRequest()

    if (!user) return { error: 'Unauthorized' }

    try {
        return await client.assessment.create({
            data: {
                userId: user.id,
                date: dayjs(`${data.date} ${data.time}`).toISOString(),
                grade: data.grade ? parseInt(data.grade, 10) : null,
                weight: parseInt(data.weight, 10),
                name: data.name,
                moduleId: data.moduleId,
            },
        })
    } catch {
        return { error: 'Error creating assessment. Please try again.' }
    }
}
