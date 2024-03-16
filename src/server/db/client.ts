import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'

export const client = new PrismaClient()
export const adapter = new PrismaAdapter(client.session, client.user)
