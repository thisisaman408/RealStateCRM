import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'packages/**/*.{test,spec}.ts',
      'integrations/**/*.{test,spec}.ts',
      'apps/**/test/e2e/**/*.{test,spec}.ts',
    ],
    alias: {
      '@resyl/constants': path.resolve(import.meta.dirname, './packages/constants/src'),
      '@resyl/validators': path.resolve(import.meta.dirname, './packages/validators/src'),
      '@resyl/types': path.resolve(import.meta.dirname, './packages/types/src'),
      '@resyl/prisma': path.resolve(import.meta.dirname, './packages/prisma/src'),
      '@resyl/int-voice': path.resolve(import.meta.dirname, './integrations/voice/index.ts'),
      '@resyl/int-whatsapp': path.resolve(import.meta.dirname, './integrations/whatsapp/src/index.ts'),
    },
  },
});
