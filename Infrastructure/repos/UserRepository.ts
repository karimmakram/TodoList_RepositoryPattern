import { User } from '../../Domain/models/User.model'
import { IUser } from '../../Domain/interfaces/IUser'
import { Repository } from './Repository'
import jsw from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export class UserRepository extends Repository {
  constructor() {
    super(new User())
  }

  async create(data: IUser) {
    try {
      const user = await new this.model({ ...data }).save()
      return await this.toJson(user)
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

  async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword)
  }

  async toJson(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      token: await this.createToken(user._id)
    }
  }
}
