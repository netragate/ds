import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      // Allow reading files from the monorepo root (needed for CHANGELOG.md?raw)
      allow: [resolve(__dirname, '../..')],
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'text-summary'],
      include: ['src/**/*.{vue,ts}'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        'playground/',
        '**/*.spec.ts',
        '**/*.config.*',
        '**/types.ts',
        'src/icons/iconRegistry.entry.ts',
        'src/icons/iconFiles.ts',
        'src/icons/iconography.meta.ts',
        'src/icons/**/*.d.ts',
        'src/icons/iconRegistry.bundle.js',
        'src/stories/**',
        'src/**/index.ts',
        'src/**/*.d.ts',
        'src/vite-env.d.ts',
        'src/components/data-display/dataTableTypes.ts',
        'src/lib/dateTimeTypes.ts',
      ],
      reportOnFailure: true,
      thresholds: {
        statements: 90,
        lines: 90,
        functions: 90,
        branches: 90,
      },
    },
  },
})
