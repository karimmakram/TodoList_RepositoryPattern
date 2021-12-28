import { User } from '../../Domain/models/User.model'
import { IUser } from '../../Domain/interfaces/IUser'
import { Repository } from './Repository'

export class UserRepository extends Repository {
  constructor() {
    super(new User())
  }

  async create(data: IUser) {
    return await new this.model({ ...data }).save()
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email })
  }
}
