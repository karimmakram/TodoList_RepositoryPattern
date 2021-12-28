import { TodoRepository } from '../../Infrastructure/repos/TodoRepository'
import { ITodo } from '../interfaces/ITodo'

export class TodoService {
  constructor(private readonly todoRepo: TodoRepository) {}
  async createTodo(data: ITodo) {
    if (data.title.length < 6) {
      throw new Error('title has to have at least 6 characters')
    }
    return await this.todoRepo.create(data)
  }

  async findAll() {
    const TodoList = await this.todoRepo.findAll()
    if (TodoList.length === 0) return 'No to do yet'
    return TodoList
  }

  async findById(id: string) {
    try {
      const todo = await this.todoRepo.findById(id)
      if (!todo) return 'no todo have this ID'
      return todo
    } catch (error) {
      throw new Error('invalid type ID')
    }
  }

  async getUserTodo(userId: string) {
    const todos = await this.todoRepo.findByUserId(userId)
    if (todos.length == 0) return 'user have not todo ever'
    return todos
  }
}
