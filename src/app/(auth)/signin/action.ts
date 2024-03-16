'use server'

import { lucia } from '@/server/auth/lucia'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { client } from '@/server/db/client'

interface SignInData {
    email: string
    password: string
}

export const signUserIn = async (
    data: SignInData
): Promise<void | { error: string }> => {
    // TODO: Implement signUserIn
    const user = await client.user.findUnique({
        where: {
            email: data.email,
        },
    })

    if (!user) {
        return {
            error: 'Incorrect email or password',
        }
    }

    const validPassord = await new Argon2id().verify(
        user.hashedPassword,
        data.password
    )
    if (!validPassord) {
        return {
            error: 'Incorrect email or password',
        }
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/dashboard')
}
