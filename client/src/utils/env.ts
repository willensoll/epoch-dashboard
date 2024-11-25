import {z} from "zod"

const envSchema = z.object({
    VITE_AUTH_TOKEN: z.string(),
    VITE_BASE_URL: z.string(),
})



export const env = envSchema.parse(import.meta.env)