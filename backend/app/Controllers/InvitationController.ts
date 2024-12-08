import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";
import Chat from "#models/chat";
import ChatMembership from "#models/chat_membership";
import Invitation from "#models/invitation";

export default class InvitationController {
  public async update(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.id;
    let data = request.only(['status'])

    const invitation = await Invitation.findBy('id', id)
    if (!invitation) {
      return response.status(404).send('Chat not found')
    }
    invitation.merge(data)
    await invitation.save()
    return response.status(200).send(invitation)
  }

  public async create(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const data = request.only(['user', 'chat', 'status', 'created_by'])

    const invitation = await Invitation.create(data)
    await invitation.save()
    return response.status(201).send(invitation)
  }

  public async delete(ctx: HttpContext) {
    const {params, request, response}: HttpContext = ctx
    const id = params.id;
    const invitation = await Invitation.findBy('id', id)
    if (!invitation) {
      return response.status(404).send('Membership not found')
    }
    await invitation.delete()
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
    const invitations = await Invitation.query().where('user', userid)
    if (invitations.length === 0) {
      return response.status(404).send({message: 'No chat memberships found'})
    }

    return response.status(200).send(invitations)
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
}
