import { describe, it, expect, beforeEach } from 'vitest'
import { redirect } from 'next/navigation'
import { signUserIn } from '@/app/(auth)/signin/action'
import { client } from '../helpers/client'

describe('signUserIn', () => {
    beforeEach(async () => {
        await client.user.create({
            data: {
                email: 'test@email.com',
                hashedPassword: process.env.HASHED_TEST_PASSWORD as string,
                firstName: 'Test',
                lastName: 'User',
            },
        })
    })

    it('should sign a user in and route them to dash', async () => {
        const res = await signUserIn({
            email: 'test@email.com',
            password: 'password',
        })

        expect(res).toBeFalsy()
        expect(redirect).toHaveBeenCalledWith('/dashboard')
    })

    it('should not sign a user in with invalid password', async () => {
        const res = await signUserIn({
            email: 'test@email.com',
            password: 'wrongpassword',
        })

        expect(res).toBeTruthy()
        expect(res?.error).toBe('Incorrect email or password')
    })

    it('should not sign a user in with invalid email', async () => {
        const res = await signUserIn({
            email: 'wrongemail@email.com',
            password: 'password',
        })

        expect(res).toBeTruthy()
        expect(res?.error).toBe('Incorrect email or password')
    })
})
