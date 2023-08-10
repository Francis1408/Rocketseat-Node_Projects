import http from 'http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) =>{
    const {method, url} = req

    await json(req, res)


//-------- Resposta é users ja cadastrados em formato de string -----
    if (method === 'GET' && url === '/users') {
        return res
            .end(JSON.stringify(users))
    }

//------ Adiciona na lista de usuarios o corpo da req -----
    if (method === 'POST' && url === '/users') {
        const {name, email} = req.body

        users.push({
            id: 1,
            name,
            email
        })

        return res.writeHead(201).end() // Resposta de sucesso
    }

    return res.writeHead(404).end()
})

server.listen(3333)