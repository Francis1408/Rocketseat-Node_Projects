import http from 'http'
import {Transform} from 'stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}


// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
    const buffers = []

// ------ Consome todos os chunks e envia tudo em uma unica resposta -----
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

// ------ Retorna cada chunk assim que eg lido ------    
    // return req
    //    .pipe(new InverseNumberStream())
    //    .pipe(res)
})

server.listen(3334)