import express from 'express'
import cors from 'cors'
import connectDb from './Infrastructure/db/db'
import './Web/controllers/TodoController'
import './Web/controllers/UserController'
import todoRoute from './Web/Routes/TodoRoute'
import { userRouter } from './Web/Routes/UserRoute'
export async function setup() {
  connectDb()
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use('/todo', todoRoute)
  app.use('/user', userRouter)

  app.get('/', async (req, res) => {
    res.send('hello')
  })

  app.use('/*', (req, res) => res.status(404).send('Not Found'))

  app.listen(process.env.Port, () => {
    console.log('App running in port : ', process.env.Port)
  })
}
