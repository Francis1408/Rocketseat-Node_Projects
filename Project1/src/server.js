import http from 'http'
import { json } from './middlewares/json.js'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

const server = http.createServer(async (req, res) =>{
    const {method, url} = req

    await json(req, res)


//-------- Resposta é users ja cadastrados em formato de string -----
    if (method === 'GET' && url === '/users') {
        const users = database.select('users') // Procura o array de users no database

        return res.end(JSON.stringify(users))
    }

//------ Adiciona na lista de usuarios o corpo da req -----
    if (method === 'POST' && url === '/users') {
        const {name, email} = req.body

        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user) // insere user no array de users

        return res.writeHead(201).end() // Resposta de sucesso
    }

    return res.writeHead(404).end()
})

server.listen(3333)