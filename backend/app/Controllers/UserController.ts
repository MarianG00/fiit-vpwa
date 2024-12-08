import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";


export default class UserController {
  public async update(ctx: HttpContext) {
    const { params, request, response }: HttpContext = ctx
    const userId = params
    const user_data = request.only(['email', 'password', 'firstName', 'lastName', 'nickName'])

    const user = await User.findBy('id', userId['userid'])
    if (!user) {
      return response.status(404).send('User not found')
    }
    user.merge(user_data)
    await user.save()
    return response.status(200).send(user)
  }
}
