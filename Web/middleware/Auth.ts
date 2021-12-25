import { Request, Response, NextFunction } from 'express'
import { User } from '../../Domain/models/User.model'
import jwt from 'jsonwebtoken'
import { UserService } from '../../Domain/service/UserService'
import { UserRepository } from '../../Infrastructure/repos/UserRepository'
import { InstanceType } from 'typegoose'

declare global {
  namespace Express {
    export interface Request {
      userId: string
      token: string
      user: InstanceType<User>
    }
  }
}
export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).send('not authorize')

  try {
    const { id } = jwt.verify(token, process.env.secret_key + '')
    if (!id) return res.status(401).send('not authorize')
    const s = new UserRepository()
    req.user = await s.findById(id)
    req.userId = id
    req.token = token
    next()
  } catch (error) {
    res.status(401)
    res.send(`tokne is not valid`)
  }
}
