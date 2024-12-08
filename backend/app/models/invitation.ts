import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'
import User from "#models/user";
import Chat from "#models/chat";

export default class Invitation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user: User

  @column()
  declare chat: Chat

  @column()
  declare status: string

  @column()
  declare created_by: User

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
