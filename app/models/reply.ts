import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Thread from './thread.js'

export default class Reply extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public userId: number

  @column()
  public threadId: number

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Thread)
  public thread: BelongsTo<typeof Thread>
}
