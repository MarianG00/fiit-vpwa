import {BaseModel, column} from '@adonisjs/lucid/orm'
import User from "#models/user";

export default class UserOptions extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user: string | null

  @column()
  declare notifications: string

  @column()
  declare status: string
}
