import { Router } from 'express'
import todoController from '../controllers/TodoController'
import { Auth } from '../middleware/Auth'
import { param } from 'express-validator'
const todoRoute = Router()
// Method  desc  accessablity

//POST    add todo  , public
todoRoute.post('/', Auth, (req, res) => {
  todoController.store(req, res)
})
//@private get all todo for own user
todoRoute.get('/user', Auth, (req, res) => todoController.getOwnTodo(req, res))

//@private get all todo for  user by id
todoRoute.get(
  '/user/:id',
  [param('id', 'send valid id').isMongoId()],
  Auth,
  (req, res) => todoController.getTodoByUserId(req, res)
)
//@public get  todo by id
todoRoute.get('/:id', (req, res) => todoController.getOneById(req, res))

//@public get all todo if exist
todoRoute.get('/', (req, res) => todoController.getall(req, res))

export default todoRoute
