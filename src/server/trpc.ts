import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { createContext } from './context'

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson,
})

export const { createCallerFactory, router } = t
export const publicProcedure = t.procedure
