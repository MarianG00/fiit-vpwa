import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";
import Chat from "#models/chat";
import ChatMembership from "#models/chat_membership";
import Invitation from "#models/invitation";
import Message from "#models/message";

export default class MessageController {
  public async update(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.id;
    let data = request.only(['body', 'mention'])

    const message = await Message.findBy('id', id)
    if (!message) {
      return response.status(404).send('Chat not found')
    }
    message.merge(data)
    await message.save()
    return response.status(200).send(message)
  }

  public async create(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const data = request.only(['body', 'chat', 'mention', 'created_by'])

    const message = await Message.create(data)
    await message.save()
    return response.status(201).send(message)
  }

  public async delete(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.id;
    const message = await Message.findBy('id', id)
    if (!message) {
      return response.status(404).send('Message not found')
    }
    await message.delete()
    return response.status(204)
  }

  public async list(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const chatid = params.chat_id
    const userid = params.user_id

    // Find the user by id
    const user = await User.findBy('id', userid)
    if (!user) {
      return response.status(404).send({message: 'User not found'})
    }
    const chat = await Chat.findBy('id', chatid)
    if (!chat) {
      return response.status(404).send({message: 'Chat not found'})
    }

    // Get chat memberships for the user
    let messages = await Message.query().where('created_by', userid).andWhere('chat', chatid)
    if (messages.length === 0) {
      return response.status(404).send({message: 'No messages found'})
    }

    return response.status(200).send(messages)
  }
  public async find(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.id;

    const invitation = Invitation.findBy('id', id)
    if (!invitation) {
      return response.status(404).send({message: 'Membership not found'})
    }
    return response.status(200).send(invitation)
  }
  public async chatlist(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const chatid = params.chat_id
    const chat = await Chat.findBy('id', chatid)
    if (!chat) {
      return response.status(404).send({message: 'Chat not found'})
    }

    const messages = await Message.query().where('chat', chatid)
    if (messages.length === 0) {
      return response.status(404).send({message: 'No messages found'})
    }
    return response.status(200).send(messages)
  }
}
