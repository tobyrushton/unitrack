/* eslint import/no-extraneous-dependencies: 0 */
import { defineConfig } from 'cypress'
import { PrismaClient } from '@prisma/client'
import { modules } from './__tests__/e2e/helpers/data'

const client = new PrismaClient()

export default defineConfig({
    e2e: {
        setupNodeEvents(on) {
            on('task', {
                createUser: async () => {
                    return client.user.create({
                        data: {
                            email: 'test@email.com',
                            hashedPassword:
                                // eslint-disable-next-line max-len
                                '$argon2id$v=19$m=19456,t=2,p=1$6t9eLYTo2hz4ElLUV5eMTQ$bG3T/5tgJny1643WI0aqXKgCWP2CFz8XzzwMsW+VgXE',
                            firstName: 'Test',
                            lastName: 'User',
                        },
                    })
                },
                'reset:db': async () => {
                    return client.user.deleteMany()
                },
                'seed:modules': async () => {
                    const { id } = (await client.user.findFirst()) as {
                        id: string
                    }
                    return client.module.createMany({
                        data: modules.map(module => ({
                            ...module,
                            userId: id,
                        })),
                    })
                },
            })
        },
        baseUrl: 'http://localhost:3000',
        specPattern: '**/*.cy.tsx',
        supportFile: false,
        chromeWebSecurity: false,
    },
})
