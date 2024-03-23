import { beforeEach, vi } from 'vitest'
import crypto from 'crypto'
import { client } from './client'

vi.mock('next/headers', () => ({
    cookies: () => ({
        set: vi.fn(),
    }),
}))

vi.mock('next/navigation', () => ({
    redirect: vi.fn(),
}))

beforeEach(async () => {
    await client.user.deleteMany()
    if (process.env.GITHUB_ACTIONS) {
        global.crypto = crypto as Crypto
    }
})
