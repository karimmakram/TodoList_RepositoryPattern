import { Todo } from '../../Domain/models/Todo.model'
import { ITodo } from '../../Domain/interfaces/ITodo'
import { Repository } from './Repository'

export class TodoRepository extends Repository {
  constructor() {
    super(new Todo())
  }

  async create(data: ITodo) {
    return await new this.model(data).save()
  }
  async findByUserId(userID: string) {
    return await this.model.find({ user: userID })
  }

  async findAll() {
    return await this.model
      .find()
      .populate({ path: 'user', select: '-password' })
      .exec()
  }
}
