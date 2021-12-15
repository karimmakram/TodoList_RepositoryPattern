import { Todo } from '../../Domain/models/Todo.model'
import { ITodo } from '../../Domain/interfaces/ITodo'
import { injectable } from 'inversify'
import { Model } from 'mongoose'

@injectable()
export class TodoRepository {
  model: Model<InstanceType<any>>
  constructor() {
    this.model = new Todo().getModelForClass(Todo)
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

  async findAll() {
    return await this.model.find({})
  }

  async findById(id: string) {
    return await this.model.findById(id)
  }
}
