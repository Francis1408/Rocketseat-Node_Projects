import fs from 'node:fs/promises'


// Indica o caminho a ser salvo o arquivo de banco de dados
const databasePath = new URL('../db.json', import.meta.url)

//console.log(databasePath)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8') // Resgata os dados ja criados no db.json
            .then(data => {
                this.#database = JSON.parse(data) 
            })
            .catch(() => {
                this.#persist() // se nao existir, cria db.json
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist() // Cria o db.json quando dados sao inseridos   
    
        return data
    }
}