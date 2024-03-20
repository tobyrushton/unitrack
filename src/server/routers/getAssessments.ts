import { z } from 'zod'
import { publicProcedure } from '../trpc'
import { validateRequest } from '../auth/validateRequest'

export const getAssessments = publicProcedure
    .output(
        z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                weight: z.number(),
                grade: z.number().nullable(),
                date: z.date(),
                module: z.object({
                    id: z.string(),
                    code: z.string(),
                }),
            })
        )
    )
    .query(async ({ ctx }) => {
        const { user } = await validateRequest()

        if (!user) throw new Error('Unauthorized')

        const assessments = await ctx.prisma.assessment.findMany({
            where: {
                userId: user.id,
            },
            include: {
                module: true,
            },
        })

        return assessments.map(assessment => ({
            ...assessment,
            module: {
                id: assessment.module.id,
                code: assessment.module.code,
            },
        }))
    })
