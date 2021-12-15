import { Container } from 'inversify'
import { TodoRepository } from './Infrastructure/repos/TodoRepository'
import { TodoService } from './Domain/service/TodoService'

export const container = new Container({ defaultScope: 'Singleton' })
container.bind(TodoService).toSelf()
container.bind(TodoRepository).toSelf()
