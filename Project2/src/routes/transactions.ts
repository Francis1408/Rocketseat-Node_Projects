import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from 'zod'
import { randomUUID } from "crypto"
import { checkSessionIdExists } from "../middlewares/check-session-id-exists"

export async function transactionRoutes(app: FastifyInstance) {
    
    // GET -> Pega o dado de todas as trasações
    app.get('/', 
    {
        preHandler: [ checkSessionIdExists ], //Executa antes do handler
    }, 
    async (req, res) => {
        const { sessionId } = req.cookies

        const transactions = await knex('transactions').
            where('session_id', sessionId).
            select()

        return { transactions }
    })


    // GET -> Pega uma unica transação a partir do seu id
    app.get('/:id', 
    {
        preHandler: [ checkSessionIdExists ], //Executa antes do handler
    }, 
    async (req) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        //verifica se o dado passados no corpo da req bate com o tipo id definido no trasactionSchema
        const { id } = getTransactionParamsSchema.parse(req.params)

        const { sessionId } = req.cookies

        const transaction = await knex('transactions')
            .where({
                session_id: sessionId,
                id,
            })
            .first()

        return { transaction }
    })

    //GET -> Retorna a soma da coluna ammount
    app.get('/summary',  
    {
        preHandler: [ checkSessionIdExists ], //Executa antes do handler
    }, 
    async (req) => {
        const { sessionId } = req.cookies

        const summary = await knex('transactions')
            .where('session_id', sessionId)
            .sum('amount', {as: 'amount'}) // as => customiza o nome do retorno
            .first()

        return { summary }
    })
    

    // POST -> Cria uma transação
    app.post('/', async (req, rep) =>{
       // {title, amount, type: credit or debit}

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        }) 

        //verifica se os dados passados no corpo da req batem com os tipos de dados definidos no trasactionSchema
        const {title, amount, type} = createTransactionBodySchema.parse(req.body,)

        // Implementação de cookies
        let sessionId = req.cookies.sessionId

        if(!sessionId) {
            sessionId = randomUUID()

            // Infos armazenadas no cookie
            rep.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7 //  7 days
            })
        } 

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId,
        })

        // 201 - Recurso criado com sucesso

        return rep.status(201).send()
    })

}
