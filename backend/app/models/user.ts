import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import {BaseModel, beforeSave, column} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from "@adonisjs/core/services/hash";
import UserOptions from "#models/user_options";

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare first_name: string | null

  @column()
  declare last_name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare status: string

  @column()
  declare options: UserOptions;

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

}
