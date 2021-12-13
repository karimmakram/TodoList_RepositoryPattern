import { ITodo } from '../../Domain/interfaces/ITodo'
import { TodoService } from '../../Domain/service/TodoService'
import { Request, Response } from 'express'

export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  async store(req: Request, res: Response) {
    try {
      const { title }: { title: string } = req.body
      if (!title) throw new Error('must send title')
      let requestData: ITodo = { title }
      res.json(await this.todoService.createTodo(requestData))
    } catch (error) {
      return res.status(500).json({
        error: String(error).split('\n')[0]
      })
    }
  }
}
