import express from 'express'
import dotEnv from 'dotenv'
import connectDb from './Infrastructure/db/db'
dotEnv.config()
const app = express()
app.use(express.json())
connectDb()
app.get('/', (req, res) => {
  res.send('Hello')
})
app.listen(process.env.Port, () => {
  console.log('App running in port : ', process.env.Port)
})
