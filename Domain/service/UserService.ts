import { injectable, id } from 'inversify'
import { IUser } from '../interfaces/IUser'
import { UserRepository } from '../../Infrastructure/repos/UserRepository'
@injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async createUser(data: IUser) {
    if (await this.userRepo.findByEmail(data.email))
      throw new Error('this Email already taken')
    return await this.userRepo.create(data)
  }
}
