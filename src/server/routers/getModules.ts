import { z } from 'zod'
import { publicProcedure } from '../trpc'
import { validateRequest } from '../auth/validateRequest'

export const getModules = publicProcedure
    .output(
        z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                code: z.string(),
                credits: z.number(),
                grade: z.number().nullable(),
            })
        )
    )
    .query(async ({ ctx }) => {
        const { user } = await validateRequest()

        if (!user) throw new Error('Unauthorized')

        const modules = await ctx.prisma.module.findMany({
            where: {
                userId: user.id,
            },
        })

        return modules.map(({ userId: _, ...module }) => module)
    })
