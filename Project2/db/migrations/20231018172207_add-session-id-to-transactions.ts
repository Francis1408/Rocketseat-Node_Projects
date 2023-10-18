import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) =>{
        table.uuid('session_id').after('id').index() // index() -> COLOCA UM INDICE NA COLUNA DA TABELA PARA FACILITAR FUTURAS QUERIES 
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) =>{
        table.dropColumn('session_id')
    })
}

