import { Model } from 'mongoose'
export abstract class Repository {
  readonly model: Model<InstanceType<any>>
  constructor(entity) {
    this.model = entity.getModelForClass(entity)
  }

  abstract create(data)
  async findAll() {
    return await this.model.find()
  }
  async findById(id: string) {
    return await this.model.findById(id)
  }
}
