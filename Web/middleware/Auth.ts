import { Request, Response, NextFunction } from 'express'
import { User } from '../../Domain/models/User.model'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    export interface Request {
      userId: string
      token: string
    }
  }
}
export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).send('not authorize')

  try {
    const { id } = jwt.verify(token, process.env.secret_key + '')
    if (!id) return res.status(401).send('not authorize')
    req.userId = id
    req.token = token
    console.log(id)
    next()
  } catch (error) {
    res.status(401)
    res.send(`tokne is not valid`)
  }
}
