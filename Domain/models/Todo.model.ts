import { Typegoose, prop } from 'typegoose'

export class Todo extends Typegoose {
  @prop({ required: true })
  title?: string
  @prop({ default: false })
  completed?: boolean
}
