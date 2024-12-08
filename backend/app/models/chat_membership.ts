import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'
import User from "#models/user";
import Chat from "#models/chat";
import Invitation from "#models/invitation";

export default class ChatMembership extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user: User

  @column()
  declare chat: Chat

  @column()
  declare role: string

  @column()
  declare invitation: Invitation

  @column()
  declare kicked: boolean

  @column()
  declare last_updated: DateTime

  @column()
  declare created_by: User

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
