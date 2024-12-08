import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'
import User from "#models/user";
import Chat from "#models/chat";

export default class ChatMessage extends BaseModel {
  @column()
  declare chat: Chat

  @column()
  declare Message: Message
}
