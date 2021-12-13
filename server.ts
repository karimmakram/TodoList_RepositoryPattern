import express from 'express'
import dotEnv from 'dotenv'
import cors from 'cors'
import connectDb from './Infrastructure/db/db'
import todoRoute from './Web/Routes/TodoRoute'
dotEnv.config()
/////////////////////////////

const app = express()
app.use(express.json())
app.use(cors())
app.use('/todo', todoRoute)
connectDb()

//////////////////////////////////

app.get('/', async (req, res) => {
  res.send('hello')
})

app.use('/*', (req, res) => res.status(404).send('Not Found'))
app.listen(process.env.Port, () => {
  console.log('App running in port : ', process.env.Port)
})
