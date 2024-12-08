import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";
import Chat from "#models/chat";
import ChatMembership from "#models/chat_membership";
import Invitation from "#models/invitation";
import Message from "#models/message";
import Attachments from "#models/attachments";

export default class MessageController {
  public async update(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.id;
    let data = request.only(['body', 'mention', 'attachments'])

    const message = await Message.findBy('id', id)
    if (!message) {
      return response.status(404).send('Chat not found')
    }
    if (data.attachments.length > 0){
      let temp
      for (const item of data['attachments']) {
        item['message'] = id
        temp = await Attachments.create(item)
        temp.save()
      }
    }
    delete data.attachments
    message.merge(data)
    await message.save()
    return response.status(200).send(message)
  }

  public async create(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const data = request.only(['body', 'chat', 'mention', 'created_by', 'attachments'])
    let attachments = data.attachments
    delete data.attachments
    const message = await Message.create(data)
    await message.save()
    if(data.attachments && data.attachments.length > 0){
      let temp
      for (const item of attachments) {
        item['message'] = message.id
        temp = await Attachments.create(item)
        await temp.save()
      }
    }
    return response.status(201).send(message)
  }
  public async attach(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const data = request.only(['attachments'])
    const mess_id = params.id

    const message = Message.findBy('id', mess_id)
    if (!message) {
      return response.status(404).send('Message not found')
    }
    let temp
    for (const item of data.attachments) {
      item['message'] = message
      temp = await Attachments.create(item)
      temp.save()
    }
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
    let temp
    for (const item of messages) {
      temp = await Attachments.query().where('message', item.id)
      item['attachments'] = temp
    }
    return response.status(200).send(messages)
  }
  public async find(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.id;

    const message = Message.findBy('id', id)
    if (!message) {
      return response.status(404).send({message: 'Membership not found'})
    }
    let atts = await Attachments.query().where('message', id)
    message['attachments'] = atts
    return response.status(200).send(message)
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
      return response.status(200).send([])
    }
    let temp
    for (const item of messages) {
      temp = await Attachments.query().where('message', item.id)
      item['attachments'] = temp
    }
    for (const message of messages) {
      temp = await User.findBy('id', message.created_by)
      message['created_by'] = temp.toJSON()
    }
    console.log(messages)
    return response.status(200).send(messages)
  }
}
