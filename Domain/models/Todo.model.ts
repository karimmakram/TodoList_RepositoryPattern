import { Typegoose, prop, Ref } from 'typegoose'
import { User } from './User.model'

export class Todo extends Typegoose {
  @prop({ required: true })
  title?: string
  @prop({ default: false })
  completed?: boolean
  @prop({ default: Date.now() })
  createdAt?: Date
  @prop({ default: Date.now() })
  updatedAt?: Date
  @prop({ ref: User, required: true })
  user?: Ref<User>
}
