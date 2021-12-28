import { IUser } from '../interfaces/IUser'
import { UserRepository } from '../../Infrastructure/repos/UserRepository'
import jsw from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async createUser(data: IUser) {
    if (await this.userRepo.findByEmail(data.email))
      throw new Error('this Email already taken')
    return await this.userRepo.create(data)
  }
  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new Error('invalid Logn')
    if (await this.comparePassword(password, user.password)) {
      return await this.toJson(user)
    } else {
      throw new Error('invalid Logn')
    }
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

  async createToken(id: string) {
    return await jsw.sign({ id }, process.env.secret_key, { expiresIn: '1h' })
  }
}
