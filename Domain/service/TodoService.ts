import { TodoRepository } from '../../Infrastructure/repos/TodoRepository'
import { ITodo } from '../interfaces/ITodo'

export class TodoService {
  constructor(private readonly todoRepo: TodoRepository) {}
  async createTodo(data: ITodo) {
    console.log(data)

    if (data.title.length < 6) {
      throw new Error('title has to have at least 6 characters')
    }
    return await this.todoRepo.create(data)
  }
}
