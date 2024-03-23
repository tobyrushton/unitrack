import { describe, it, expect, Mock, vi, beforeEach } from 'vitest'
import { deleteAction } from '@/server/actions/delete'
import { validateRequest } from '../../../src/server/auth/validateRequest'
import { client } from '../helpers/client'

vi.mock('../../../src/server/auth/validateRequest', () => ({
    validateRequest: vi.fn(),
}))

describe('deleteAction', () => {
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
        ;(validateRequest as Mock).mockReturnValueOnce({ user: { id: '123' } })
    })

    it('should not be able to delete an item when userId doesnt match', async () => {
        await client.user.create({
            data: {
                id: '321',
                email: 'test2@email.com',
                hashedPassword: 'password',
                firstName: 'Test2',
                lastName: 'User',
            },
        })

        const item = await client.module.create({
            data: {
                name: 'Test Module',
                code: 'T123',
                credits: 10,
                userId: '321',
            },
        })

        const res = await deleteAction({ id: item.id, model: 'module' })

        expect(res).toBeTruthy()
        expect(res?.error).toBe('Unauthorized')
        const count = await client.module.count()
        expect(count).toBe(1)
    })

    it('should not be able to delete an item when it doesnt exist', async () => {
        const res = await deleteAction({ id: '123', model: 'module' })

        expect(res).toBeTruthy()
        expect(res?.error).toBe('Not found')
    })

    it('should be able to delete module', async () => {
        const item = await client.module.create({
            data: {
                name: 'Test Module',
                code: 'T123',
                credits: 10,
                userId: '123',
            },
        })

        const res = await deleteAction({ id: item.id, model: 'module' })

        expect(res).toBeUndefined()
        const count = await client.module.count()
        expect(count).toBe(0)
    })

    it('should be able to delete calendarItem', async () => {
        await client.module.create({
            data: {
                id: '123',
                name: 'Test Module',
                code: 'T123',
                credits: 10,
                userId: '123',
            },
        })
        const item = await client.calendarItem.create({
            data: {
                title: 'Test Calendar Item',
                start: new Date(),
                end: new Date(),
                userId: '123',
                moduleId: '123',
            },
        })

        const res = await deleteAction({ id: item.id, model: 'calendarItem' })

        expect(res).toBeUndefined()
        const count = await client.calendarItem.count()
        expect(count).toBe(0)
    })

    it('should be able to delete assessment', async () => {
        await client.module.create({
            data: {
                id: '123',
                name: 'Test Module',
                code: 'T123',
                credits: 10,
                userId: '123',
            },
        })
        const item = await client.assessment.create({
            data: {
                name: 'Test Assessment',
                weight: 10,
                moduleId: '123',
                userId: '123',
                date: new Date(),
            },
        })

        const res = await deleteAction({ id: item.id, model: 'assessment' })

        expect(res).toBeUndefined()
        const count = await client.assessment.count()
        expect(count).toBe(0)
    })
})
