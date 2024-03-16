'use server'

import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'
import { lucia } from '@/server/auth/lucia'
import { redirect } from 'next/navigation'
import { client } from '@/server/db/client'

interface IData {
    email: string
    firstName: string
    lastName: string
    password: string
}

export const registerUser = async (data: IData): Promise<void> => {
    const hashedPassword = await new Argon2id().hash(data.password)

    const user = await client.user.create({
        data: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            hashedPassword,
        },
    })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/dashboard')
}
