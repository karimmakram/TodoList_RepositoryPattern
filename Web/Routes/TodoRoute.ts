import { Router } from 'express'
import todoController from '../controllers/TodoController'
import { Auth } from '../middleware/Auth'
const todoRoute = Router()
// Method  desc  accessablity

//POST    add todo  , public
todoRoute.post('/', Auth, (req, res) => {
  todoController.store(req, res)
})
//@public get  todo by id
todoRoute.get('/:id', (req, res) => todoController.getOneById(req, res))

//@public get all todo if exist
todoRoute.get('/', (req, res) => todoController.getall(req, res))
export default todoRoute
