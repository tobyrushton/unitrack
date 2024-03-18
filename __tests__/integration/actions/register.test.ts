import { describe, expect, it } from 'vitest'
import { redirect } from 'next/navigation'
import { registerUser } from '@/app/(auth)/register/action'
import { client } from '../helpers/client'

describe('registerUser', () => {
    it('should register a user and route them to dash', async () => {
        await registerUser({
            email: 'test@email.com',
            password: 'password',
            firstName: 'Test',
            lastName: 'User',
        })

        const user = await client.user.findFirst({
            where: {
                email: 'test@email.com',
            },
        })

        expect(user).not.toBeNull()
        expect(user?.firstName).toBe('Test')
        expect(user?.lastName).toBe('User')

        expect(redirect).toHaveBeenCalledWith('/dashboard')
    })
})
