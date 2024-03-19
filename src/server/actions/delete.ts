'use server'

import type { Prisma } from '@prisma/client'
import { client } from '../db/client'
import { validateRequest } from '../auth/validateRequest'

type Model = 'calendarItem' | 'module' | 'assessment'

export interface DeleteRequest {
    id: string
    model: Model
}

export const deleteAction = async ({
    id,
    model,
}: DeleteRequest): Promise<void | { error: string }> => {
    const { user } = await validateRequest()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // type cast will require further validation to ensure against errors
    const item = await (client[model] as Prisma.ModuleDelegate).findUnique({
        where: { id },
    })

    if (!item) {
        return { error: 'Not found' }
    }
    if (item.userId !== user.id) {
        return { error: 'Unauthorized' }
    }

    await (client[model] as Prisma.ModuleDelegate).delete({ where: { id } })

    return undefined
}
