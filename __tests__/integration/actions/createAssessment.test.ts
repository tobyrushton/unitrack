import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { validateRequest } from '@/server/auth/validateRequest'
import { createAssessment } from '@/app/dashboard/assessments/action'
import { client } from '../helpers/client'

vi.mock('../../../src/server/auth/validateRequest', () => ({
    validateRequest: vi.fn(),
}))

describe('createAssessment', () => {
    beforeEach(async () => {
        await client.user.create({
            data: {
                id: '123',
                email: 'test@email.com',
                hashedPassword: 'password',
                firstName: 'Test',
                lastName: 'User',
            },
        })

        await client.module.create({
            data: {
                id: '123',
                name: 'Test Module',
                code: 'T123',
                credits: 10,
                userId: '123',
            },
        })
        ;(validateRequest as Mock).mockReturnValueOnce({ user: { id: '123' } })
    })

    it('should create an assessment', async () => {
        const res = await createAssessment({
            name: 'Test Assessment',
            weight: 10,
            date: new Date(),
            moduleId: '123',
            grade: null,
        })

        expect(res).toBeUndefined()
        const count = await client.assessment.count()
        expect(count).toBe(1)
    })
})
