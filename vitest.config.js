import { defineConfig } from 'vitest/config'
import { preview } from '@vitest/browser-preview'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'node',
          include: [
            'spec/**/*.test.js',
           
          ],
          exclude: [
            
          ],
          environment: 'jsdom',
        },
      },
      {
        test: {
          name: 'browser',
          include: [
            'vitest-example/**/*.test.js',
          ],
          browser: {
            enabled: true,
            provider: preview(),
            instances: [
              { browser: 'firefox' },
            ],
          },
        },
      },
    ],
  },
})
