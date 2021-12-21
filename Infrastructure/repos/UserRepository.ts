import { User } from '../../Domain/models/User.model'
import { IUser } from '../../Domain/interfaces/IUser'
import { Repository } from './Repository'
import jsw from 'jsonwebtoken'
export class UserRepository extends Repository {
  constructor(user: User) {
    super(user)
  }

  async create(data: IUser) {
    try {
      const user = await new this.model({ ...data }).save()
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        token: await this.createToken(user._id)
      }
    } catch (error) {
      throw new Error('Invaild Data')
    }
  }

  async createToken(id: string) {
    return await jsw.sign({ id }, process.env.secret_key, { expiresIn: '1h' })
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email })
  }
}
