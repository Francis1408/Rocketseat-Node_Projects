// Middlewres = Função que intercepta uma função


export async function json(req, res) {

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

    res.setHeader('Content-type', 'application/json')
}