import { z } from 'zod'

const envSchema = z.object({
  GOOGLE_OAUTH_CLIENT_ID: z.string(),
  GOOGLE_OAUTH_CLIENT_REDIRECT_URI: z.string()
})

export const env = envSchema.parse(process.env)
