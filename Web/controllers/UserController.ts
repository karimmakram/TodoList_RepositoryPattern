import { UserService } from '../../Domain/service/UserService'
import { Request, Response } from 'express-serve-static-core'
import { UserRepository } from '../../Infrastructure/repos/UserRepository'
import { validationResult } from 'express-validator'
export class UserController {
  private readonly userService = new UserService(new UserRepository())

  async create(req: Request, res: Response) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).send(error.array().map(e => e.msg))
    }
    const {
      name,
      email,
      password
    }: { name: string; email: string; password: string } = req.body
    try {
      res.json(await this.userService.createUser({ name, email, password }))
    } catch (error) {
      res.status(500).json({
        error: String(error).split('\n')[0]
      })
    }
  }

  async login(req: Request, res: Response) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).send(error.array().map(e => e.msg))
    }
    try {
      const { email, password }: { email: string; password: string } = req.body
      res.send(await this.userService.login(email, password))
    } catch (error) {
      res.status(500).json({
        error: String(error).split('\n')[0]
      })
    }
  }
}

export default new UserController()
