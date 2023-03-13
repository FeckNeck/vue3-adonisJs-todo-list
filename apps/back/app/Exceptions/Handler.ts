import Logger from "@ioc:Adonis/Core/Logger";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */
    if (
      ["E_INVALID_AUTH_UID", "E_INVALID_AUTH_PASSWORD"].includes(error.code)
    ) {
      return ctx.response.badRequest({
        code: "E_INVALID_CREDENTIALS",
        message: "No account found",
      });
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx);
  }
}
