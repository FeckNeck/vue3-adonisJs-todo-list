import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUser {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.trim(),
      rules.lowercase(),
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string([rules.minLength(8), rules.confirmed()]),
  });

  public messages: CustomMessages = {
    "email.required": "You need to specify an email.",
    "email.email": "Your email is not valid.",
    "email.unique": "An account already exists with the provided email.",
    "email.maxLength": "Your email cannot be longer than 255 characters.",
    "password.required": "You need to specify a password.",
    "password.minLength":
      "Your password needs to be at least 8 characters long.",
    "password_confirmation.confirmed": "Passwords do not match.",
  };
}
