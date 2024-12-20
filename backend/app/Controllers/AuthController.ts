import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from "@adonisjs/core/services/hash";
import UserOptions from "#models/user_options";
import ChatMembership from "#models/chat_membership";

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    // validate email
    let user_details = request.only(['email', 'password', 'firstName', 'lastName', 'nickName'])
    console.log(user_details)
    user_details = {
      email: user_details.email,
      password: user_details.password,
      first_name: user_details.firstName,
      last_name: user_details.lastName,
      username: user_details.nickName,
    }

    const user = await User.create(user_details)
    console.log(user)
    const options = await UserOptions.create({})
    const data = {'options': options.id};
    console.log(options)
    user.merge(data)
    user.save()
    const general = {'chat': 1, role: '0', 'user': user.id}
    const membr = await ChatMembership.create(general)
    membr.save()
    return response.created(user)
  }

  //   login function
  public async login( ctx : HttpContext) {
    const { request, auth, response } = ctx
    const { email, password } = request.only(['email', 'password'])

    let user = await User.findBy('email', email)
    console.log(user)
    if (!user) {
      user = await User.findBy('username', email)
      console.log(user)
      if(!user) {
        return response.unauthorized({message: 'Invalid email or password'})
      }
    }
    const hash_verify = await hash.verify(user.password, password)
    console.log(hash_verify)
    if (!hash_verify) {
      return response.unauthorized({message: 'Invalid password'})
    }

    const userToken = await auth.use('api').authenticateAsClient(user)
    if (!userToken) {
      return response.internalServerError({message: 'Failed to get token'})
    }
    user.options = await UserOptions.findBy('id', user.options)
    console.log(user)
    return response.ok({ userToken: auth.user, user })
  }

  //   logout function
  public async logout(ctx : HttpContext) {
    const { request, auth, response } = ctx
    await auth.use('api').logout()
    return response.status(200)
  }
}
