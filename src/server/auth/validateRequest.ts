import { cookies } from 'next/headers'
import { cache } from 'react'
import type { Session, User } from 'lucia'
import { lucia } from './lucia'

export const validateRequest = cache(
    async (): Promise<
        { user: User; session: Session } | { user: null; session: null }
    > => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

        if (!sessionId) {
            return { user: null, session: null }
        }

        const res = await lucia.validateSession(sessionId)
        // next throws when attempting to set cookie when rendering page
        try {
            if (res.session && res.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(res.session.id)
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                )
            }
            if (!res.session) {
                const sessionCookie = lucia.createBlankSessionCookie()
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                )
            }
            // eslint-disable-next-line
        } catch {}

        return res
    }
)
