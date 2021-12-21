import { Model } from 'mongoose'
export abstract class Repository {
  readonly model: Model<InstanceType<any>>
  constructor(entity) {
    this.model = entity.getModelForClass(entity)
  }
}
