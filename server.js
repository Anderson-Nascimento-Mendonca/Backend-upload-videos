import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
//import { DatabaseMemory } from './database-memory.js'

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) =>{
    const {title, descricao, duration} = request.body
   await database.create({
       title,
      descricao,
        duration,

    })
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
 
    const videos = await database.list(search)
    return videos
})
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, descricao, duration} = request.body
    await database.update(videoId, {
      title,
      descricao,
      duration,  

    })
    return reply.status(204).send()
})
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)
    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})