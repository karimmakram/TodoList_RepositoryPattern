import { ITodo } from '../../Domain/interfaces/ITodo'
import { TodoService } from '../../Domain/service/TodoService'
import { Request, Response } from 'express'
import {
  controller,
  httpPost,
  httpGet,
  requestParam
} from 'inversify-express-utils'

@controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  //@Public add new todo
  @httpPost('/')
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

  //@public get all todo if exist
  @httpGet('/')
  async getall(req: Request, res: Response) {
    res.send(await this.todoService.findAll())
  }

  @httpGet('/:id')
  async getOneById(
    @requestParam('id') id: string,
    req: Request,
    res: Response
  ) {
    try {
      res.send(await this.todoService.findById(id))
    } catch (error) {
      res.status(400).json({
        error: String(error).split('\n')[0]
      })
    }
  }
}
