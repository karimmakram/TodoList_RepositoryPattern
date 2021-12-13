import { Router } from 'express'
import { TodoService } from '../../Domain/service/TodoService'
import { TodoRepository } from '../../Infrastructure/repos/TodoRepository'
import { Todo } from '../../Domain/models/Todo.model'
import { TodoController } from '../controllers/TodoController'
const todoRoute = Router()
// Method  desc  accessablity

//POST    add todo  , public
todoRoute.post('/', (req, res) => {
  const repo = new TodoRepository(new Todo())
  const service = new TodoService(repo)
  const controller = new TodoController(service)
  controller.store(req, res)
})

export default todoRoute
