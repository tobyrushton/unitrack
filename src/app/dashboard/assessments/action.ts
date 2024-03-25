'use server'

import { validateRequest } from '@/server/auth/validateRequest'
import { client } from '@/server/db/client'
import dayjs from 'dayjs'

interface Data
    extends Omit<
        assessment.Assessment,
        'userId' | 'grade' | 'weight' | 'date'
    > {
    time: string
    weight: string
    grade: string | null
    date: string
}

export const createAssessment = async (
    data: Data
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

export const updateAssessment = async (
    data: Data & { id: string }
): Promise<void | { error: string }> => {
    const { user } = await validateRequest()

    if (!user) return { error: 'Unauthorized' }

    try {
        await client.assessment.update({
            where: { id: data.id },
            data: {
                date: dayjs(`${data.date} ${data.time}`).toISOString(),
                grade: data.grade ? parseInt(data.grade, 10) : null,
                weight: parseInt(data.weight, 10),
                name: data.name,
                moduleId: data.moduleId,
            },
        })
    } catch {
        return { error: 'Error updating assessment. Please try again.' }
    }

    return undefined
}
