import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'
import User from "#models/user";

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare private: boolean

  @column()
  declare administrator: boolean

  @column()
  declare last_update: DateTime

  @column()
  declare created_by: User

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
