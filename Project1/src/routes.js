import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [

// ROTA GET - Procurar
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            console.log(req.query)

            const users = database.select('users') // Procura o array de users no database

            return res.end(JSON.stringify(users))
        }
    },

// ROTA POST - Inserir
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const {name, email} = req.body

            const user = {
                id: randomUUID(),
                name,
                email
            }
    
            database.insert('users', user) // insere user no array de users
    
            return res.writeHead(201).end() // Resposta de sucesso
        }
    },
// ROTA DELETE - Deletar
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('users', id)

            return res.writeHead(204).end()
        },
    },
// ROTA PUT - Atualizar
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body

            database.update('users', id, {
                name,
                email,
            })

            return res.writeHead(204).end()
        },
    }
]