import { Router, Response, Request } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/UserController'

export const userRouter = Router()

//@POST create user   @Public
userRouter.post(
  '/',
  [
    check('email', 'please send valid Email').isEmail(),
    check('password', 'password at least 6 characters').isLength({ min: 6 }),
    check('name', 'name at least 2 characters')
      .exists()
      .isLength({ min: 2 })
  ],
  (req: Request, res: Response) => userController.create(req, res)
)

//@POST login @public

userRouter.post(
  '/login',
  [
    check('email', 'plases send valid data').exists(),
    check('password', 'plases send valid data').exists()
  ],
  (req, res) => userController.login(req, res)
)
