import http from 'http'

const users = []

const server = http.createServer(async (req, res) =>{
    const {method, url} = req

    const buffers = []

// ------ Consome todos os chunks e envia tudo em uma unica resposta -----
    for await (const chunk of req) {
        buffers.push(chunk)
    }
// ------ Transforma o corpo da requisicao feita em JSON ------
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

//-------- Resposta é users ja cadastrados em formato de string -----
    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-type', 'application/json')
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