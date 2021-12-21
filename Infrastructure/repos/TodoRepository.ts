import { Todo } from '../../Domain/models/Todo.model'
import { ITodo } from '../../Domain/interfaces/ITodo'
import { Repository } from './Repository'

export class TodoRepository extends Repository {
  constructor(todo: Todo) {
    super(todo)
  }

  async create(data: ITodo) {
    try {
      return await new this.model({
        title: data.title,
        completed: data.completed ? data.completed : false,
        user: data.user
      }).save()
    } catch (error) {
      throw new Error(String(error))
    }
  }

  async findAll() {
    return await this.model.find({})
  }

  async findById(id: string) {
    return await this.model.findById(id)
  }
}
