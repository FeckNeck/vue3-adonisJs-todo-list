import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Todo from "./Todo";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>;

  @column()
  public email: string;

  @column({
    serializeAs: null,
  })
  public password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
