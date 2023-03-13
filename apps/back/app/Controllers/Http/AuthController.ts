import User from "../../Models/User";
import CreateUser from "../../Validators/CreateUserValidator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUser);
    await User.create(payload);
    return response.created();
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);
    } catch (error) {
      if (error.code === "E_INVALID_AUTH_UID") {
        const fakePassword = await Hash.make("fakePassword");
        await Hash.verify(fakePassword, "fakePassword");
      }
      throw error;
    }
    return response.noContent();
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.noContent();
  }

  public async check({ auth, response }: HttpContextContract) {
    return response.ok({ authenticated: auth.isAuthenticated });
  }

  public me({ auth }: HttpContextContract) {
    return auth.user;
  }
}
