'use server'

import { client } from '@/server/db/client'
import { validateRequest } from '@/server/auth/validateRequest'

interface NewModule {
    name: string
    code: string
    weight: string
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
            weight: parseInt(data.weight, 10),
            userId: user.id,
        },
    })

    return undefined
}
