import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";
import UserOptions from "#models/user_options";


export default class UserOptionsController {
  public async update(ctx: HttpContext) {
    const { params, request, response }: HttpContext = ctx
    const userId = params.user_id
    const user_data = request.only(['status', 'notifications'])
    const user = await User.findBy('id', userId)
    if (!user) {
      return response.status(404).send({message: 'User not found'})
    }
    const userOptions = await UserOptions.findBy('id', user.options)
    console.log(user_data)
    if (!userOptions) {
      return response.status(404).send('User not found')
    }
    userOptions.merge(user_data)
    await userOptions.save()
    return response.status(200).send(userOptions)
  }
}
