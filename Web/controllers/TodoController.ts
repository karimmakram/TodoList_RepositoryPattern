import { ITodo } from '../../Domain/interfaces/ITodo'
import { TodoService } from '../../Domain/service/TodoService'
import { Request, Response } from 'express'
import { TodoRepository } from '../../Infrastructure/repos/TodoRepository'
import { validationResult } from 'express-validator'
export class TodoController {
  private todoService = new TodoService(new TodoRepository())

  async store(req: Request, res: Response) {
    try {
      const { title }: { title: string } = req.body
      if (!title) throw new Error('must send title')
      let requestData: ITodo = { title, user: req.userId }
      res.json(await this.todoService.createTodo(requestData))
    } catch (error) {
      return res.status(500).json({
        error: String(error).split('\n')[0]
      })
    }
  }

  async getall(req: Request, res: Response) {
    res.send(await this.todoService.findAll())
  }

  async getOneById(req: Request, res: Response) {
    const id: string = req.params.id
    try {
      res.send(await this.todoService.findById(id))
    } catch (error) {
      res.status(400).json({
        error: String(error).split('\n')[0]
      })
    }
  }
  async getOwnTodo(req: Request, res: Response) {
    try {
      res.send(await this.todoService.getUserTodo(req.userId))
    } catch (error) {
      res.status(500).send('server Error')
    }
  }

  async getTodoByUserId(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send(errors.array().map(e => e.msg))
    const id: string = req.params.id
    try {
      res.send(await this.todoService.getUserTodo(id))
    } catch (error) {
      res.status(500).send('ID error')
    }
  }
}

export default new TodoController()
