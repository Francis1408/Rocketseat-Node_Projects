import fastify from "fastify";
import cookie from '@fastify/cookie'

import { env } from './env'
import { transactionRoutes } from "./routes/transactions";

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.register(cookie)


app.register(transactionRoutes, {
    prefix: 'transactions',
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP server Running!')
})