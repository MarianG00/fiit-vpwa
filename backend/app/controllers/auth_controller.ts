import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "#models/user";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {

    const email = request.input("email");
    const password = request.input('password')

    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }

  public async register({ request, auth }: HttpContextContract) {

    const email = request.input("email");
    const password = request.input("password");
    const firstName = request.input("firstName");
    const lastName = request.input("lastName");
    const nickName = request.input("nickName");

    const user = new User();
    user.email = email;
    user.password = password;
    user.first_name = firstName;
    user.last_name = lastName;
    user.username = nickName;
    await user.save();
    console.log("User saved");

    const token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    });

    return token.toJSON();
  }
}
