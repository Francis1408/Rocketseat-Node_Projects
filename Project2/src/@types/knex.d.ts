//Definição de tipos
import { Knex } from 'knex'


// Definição da estrutura das tabelas
declare module 'knex/types/tables' {
    export interface Tables {
        transactions: {
            id: string,
            title: string,
            amount: number,
            created_at: string,
            session_id?: string
        }
    }
}