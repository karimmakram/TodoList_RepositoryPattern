import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import cors from 'cors'
import connectDb from './Infrastructure/db/db'
import { container } from './Continar'
import './Web/controllers/TodoController'

export async function setup() {
  connectDb()

  const server = new InversifyExpressServer(container)
  server.setConfig(app => {
    app.use(express.json())
    app.use(cors())
  })

  const app = server.build()

  app.get('/', async (req, res) => {
    res.send('hello')
  })

  app.use('/*', (req, res) => res.status(404).send('Not Found'))

  app.listen(process.env.Port, () => {
    console.log('App running in port : ', process.env.Port)
  })
}
