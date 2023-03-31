import fastify from 'fastify'
import { knex } from './database'
import crypto from 'crypto'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')
  return transaction
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('HTTP server running on port 3000')
  })
