import { Lucia } from 'lucia'
import { adapter } from '../db/client'

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        },
    },
})

declare module 'Lucia' {
    interface Register {
        Lucia: typeof lucia
    }
}
