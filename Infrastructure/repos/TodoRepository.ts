import { Repository } from './Repository'
import { Todo } from '../../Domain/models/Todo.model'
import { ITodo } from '../../Domain/interfaces/ITodo'

export class TodoRepository extends Repository {
  constructor(todo: Partial<Todo>) {
    super(todo)
  }
  async create(data: ITodo) {
    try {
      return await new this.model({
        title: data.title,
        completed: data.completed ? data.completed : false
      }).save()
    } catch (error) {
      throw new Error(String(error))
    }
  }
}
