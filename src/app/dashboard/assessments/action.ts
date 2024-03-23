'use server'

import { validateRequest } from '@/server/auth/validateRequest'
import { client } from '@/server/db/client'

export const createAssessment = async (
    data: Omit<assessment.Assessment, 'userId'>
): Promise<void | { error: string }> => {
    const { user } = await validateRequest()

    if (!user) return { error: 'Unauthorized' }

    try {
        await client.assessment.create({
            data: {
                ...data,
                userId: user.id,
            },
        })
    } catch {
        return { error: 'Error creating assessment. Please try again.' }
    }
    return undefined
}
