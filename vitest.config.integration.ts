/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    test: {
        include: ['__tests__/integration/**/*.ts'],
        setupFiles: ['__tests__/integration/helpers/setup.ts'],
        exclude: ['__tests__/integration/helpers'],
        fileParallelism: false,
        testTimeout: 10000,
    },
    plugins: [tsconfigPaths()],
})
