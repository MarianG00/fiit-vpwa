import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";
import Chat from "#models/chat";
import ChatMembership from "#models/chat_membership";

export default class ChatController {
  public async update(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params
    let data = request.only(['name', 'administrator', 'private'])
    data['last_update'] = new Date(Date.now())

    const chat = await Chat.findBy('id', id['chatid'])
    if (!chat) {
      return response.status(404).send('Chat not found')
    }
    chat.merge(data)
    await chat.save()
    return response.status(200).send(chat)
  }

  public async create(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const data = request.only(['name', 'administrator', 'private', 'created_by'])
    data['last_update'] = new Date(Date.now())

    const user = await User.findBy('id', data['created_by'])
    if (!user) {
      return response.status(404).send('User not found')
    }
    const chat = await Chat.create(data)
    await chat.save()

    let memb_data = {'user': data['created_by'], 'chat': chat.id, 'role': 0, "last_updated": new Date(Date.now())}
    const membr = await ChatMembership.create(memb_data)
    await membr.save()

    return response.status(201).send(chat)
  }

  public async delete(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params
    const chat = await Chat.findBy('id', id['chatid'])
    if (!chat) {
      return response.status(404).send('Chat not found')
    }
    await chat.delete()
    return response.status(204)
  }

  public async list(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const userid = params.id

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

    // Extract chat ids
    const chat_ids = chat_membs.map(membership => membership.chat) // Assuming `chat_id` is the column

    // Fetch chats using `whereIn` to get multiple chats
    const chats = await Chat.query().whereIn('id', chat_ids).orWhere('private', false)

    return response.status(200).send(chats)
  }
  public async get_chat(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const chatid = params.chat_id

    // Fetch chats using `whereIn` to get multiple chats
    const chats = await Chat.findBy('id', chatid)

    return response.status(200).send(chats)
  }
}
