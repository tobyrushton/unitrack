/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        include: ['__tests__/unit/**/*.ts', '__tests__/unit/**/*.tsx'],
        exclude: ['__tests__/unit/helpers'],
        setupFiles: ['__tests__/unit/helpers/setup.ts'],
        globals: true,
    },
})
