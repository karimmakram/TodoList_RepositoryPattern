import { Todo } from '../../Domain/models/Todo.model'
import { ITodo } from '../../Domain/interfaces/ITodo'
import { Repository } from './Repository'

export class TodoRepository extends Repository {
  constructor() {
    super(new Todo())
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
}
