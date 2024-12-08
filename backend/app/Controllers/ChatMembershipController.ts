import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";
import Chat from "#models/chat";
import ChatMembership from "#models/chat_membership";

export default class ChatMembershipController {
  public async update(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.memb_id;
    let data = request.only(['role', 'kicked'])
    data['last_updated'] = new Date(Date.now())

    const membership = await ChatMembership.findBy('id', id)
    if (!membership) {
      return response.status(404).send('Chat not found')
    }
    membership.merge(data)
    await membership.save()
    return response.status(200).send(membership)
  }

  public async create(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const data = request.only(['user', 'chat', 'role', 'invitation', 'kicked', 'created_by'])
    data['last_updated'] = new Date(Date.now())

    const membership = await ChatMembership.create(data)
    await membership.save()
    return response.status(201).send(membership)
  }

  public async delete(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.memb_id;
    const chat = await ChatMembership.findBy('id', id)
    if (!chat) {
      return response.status(404).send('Membership not found')
    }
    await chat.delete()
    return response.status(204)
  }

  public async list(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const userid = params.user_id

    // Find the user by id
    const user = await User.findBy('id', userid)
    if (!user) {
      return response.status(404).send({message: 'User not found'})
    }

    // Get chat memberships for the user
    const chat_membs = await ChatMembership.query().where('user', userid)
    if (chat_membs.length === 0) {
      return response.status(404).send({message: 'No chat memberships found'})
    }

    return response.status(200).send(chat_membs)
  }
  public async find(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.memb_id;

    const chat = ChatMembership.findBy('id', id)
    if (!chat) {
      return response.status(404).send({message: 'Membership not found'})
    }
    return response.status(200).send(chat)
  }
  public async members(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.chat_id;
    const chat = await Chat.findBy('id', id)
    if (!chat) {
      return response.status(404).send({message: 'Chat not found'})
    }
    const membs = await ChatMembership.query().where('chat', id)
    if(membs.length === 0) {
      return response.status(404).send({message: 'No chat memberships found'})
    }
    const users = membs.map((membership) => membership.user);
    const user_objects = User.query().whereIn('id', users)
    for (const user of users) {
      user.toJSON()
    }
    return response.status(200).send(user_objects)


  }
}
