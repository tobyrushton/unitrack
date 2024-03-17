import { client, PrismaClientSingleton } from './db/client'

interface Context {
    prisma: PrismaClientSingleton
}

export const createContext = (): Context => ({
    prisma: client,
})
