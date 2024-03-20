/* eslint import/no-extraneous-dependencies: 0 */
import { defineConfig } from 'cypress'
import { PrismaClient } from '@prisma/client'
import { modules, assessments } from './__tests__/e2e/helpers/data'

const client = new PrismaClient()

export default defineConfig({
    e2e: {
        setupNodeEvents(on) {
            on('task', {
                createUser: async () => {
                    return client.user.create({
                        data: {
                            email: 'test@email.com',
                            hashedPassword: process.env
                                .HASHED_TEST_PASSWORD as string,
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
                'seed:assessments': async () => {
                    const { id } = (await client.user.findFirst()) as {
                        id: string
                    }
                    const firstModule = await client.module.findFirst({
                        where: {
                            userId: id,
                        },
                    })

                    return client.assessment.createMany({
                        data: assessments.map(assessment => ({
                            ...assessment,
                            userId: id,
                            moduleId: firstModule?.id as string,
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
