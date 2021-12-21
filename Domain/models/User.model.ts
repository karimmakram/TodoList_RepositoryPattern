import { Typegoose, prop, pre, instanceMethod } from 'typegoose'
import bcrypt from 'bcrypt'
@pre<User>('save', async function(next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 8)
})
export class User extends Typegoose {
  @prop({ required: true, unique: true, lowercase: true, index: true })
  email?: string
  @prop({ required: true, minlength: 6 })
  password?: string
  @prop({ required: true, minlength: 2 })
  name?: string
}
