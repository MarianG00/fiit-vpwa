import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'
import User from "#models/user";
import Chat from "#models/chat";

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare body: string

  @column()
  declare chat: Chat

  @column()
  declare mention: User

  @column()
  declare created_by: User

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
