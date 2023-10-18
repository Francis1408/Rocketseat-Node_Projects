import 'dotenv/config'
import { z } from 'zod'

// formato de dados das variáveis de ambiente

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333),
})

//verifica se os dados passados no process.env barem com os tipos de dados definidos no envSchema
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Invalid enviroment variables!', _env.error.format())

    throw new Error('Invalid enviroment variables!')
}

export const env = _env.data
