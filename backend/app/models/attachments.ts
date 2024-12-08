import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'
import User from "#models/user";
import Message from "#models/message";

export default class Attachments extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string

  @column()
  declare message: Message

  @column()
  declare fileType: string

  @column()
  declare fileSize: number

  @column()
  declare fileName: string

  @column()
  declare created_by: User

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
