//🟢 vitest.config.ts — فقط Test

// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
        include: ["src/**/*.test.{ts,tsx}"],
        exclude: [
            "**/*.stories.ts",
            "**/*.stories.tsx",
            ".storybook/**",
            "playground/**",
        ],
    },
})
