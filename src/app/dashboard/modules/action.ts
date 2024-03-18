'use server'

import { client } from '@/server/db/client'
import { validateRequest } from '@/server/auth/validateRequest'

interface NewModule {
    name: string
    code: string
    credits: string
}

export const createModule = async (
    data: NewModule
): Promise<void | { error: string }> => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    await client.module.create({
        data: {
            name: data.name,
            code: data.code,
            credits: parseInt(data.credits, 10),
            userId: user.id,
        },
    })

    return undefined
}

export const updateModule = async (
    data: NewModule & { id: string }
): Promise<void | { error: string }> => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    await client.module.update({
        where: {
            id: data.id,
        },
        data: {
            name: data.name,
            code: data.code,
            credits: parseInt(data.credits, 10),
        },
    })

    return undefined
}
