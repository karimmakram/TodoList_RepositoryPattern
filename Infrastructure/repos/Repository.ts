import { Model } from 'mongoose'
export abstract class Repository {
  model: Model<InstanceType<any>>
  constructor(entity) {
    this.model = entity.getModelForClass(entity)
  }
}
