import { FC } from 'react'
import { validateRequest } from '@/server/auth/validateRequest'
import { lucia } from '@/server/auth/lucia'
import { ActionResult } from 'next/dist/server/app-render/types'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Button } from './ui/button'

export const SignOut: FC<{ className?: string }> = ({ className }) => {
    const signOut = async (): Promise<ActionResult> => {
        'use server'

        const { session } = await validateRequest()
        if (!session) {
            return {
                error: 'Unauthorized',
            }
        }

        await lucia.invalidateSession(session.id)

        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )
        return redirect('/signin')
    }

    return (
        <form action={signOut}>
            <Button className={className} type="submit">
                Sign Out
            </Button>
        </form>
    )
}
