export interface ITodo {
  readonly id?: string
  title: string
  completed?: boolean
  user: string
  createdAt?: Date
  updatedAt?: Date
}
