import { ITodo } from '../../Domain/interfaces/ITodo'
import { TodoService } from '../../Domain/service/TodoService'
import { Request, Response } from 'express'
import { Todo } from '../../Domain/models/Todo.model'
import { TodoRepository } from '../../Infrastructure/repos/TodoRepository'

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

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
}

export default new TodoController(
  new TodoService(new TodoRepository(new Todo()))
)
