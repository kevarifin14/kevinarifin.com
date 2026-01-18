import { config } from 'dotenv'
import { resolve } from 'node:path'
import { defineConfig } from 'drizzle-kit'

config({ path: resolve(process.cwd(), '.env.local') })

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
