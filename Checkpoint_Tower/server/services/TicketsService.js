import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"



class TicketsService { 
  async getTicketsForEvent(event) {
    return await dbContext.Tickets.find({ eventId: event.id }).populate('account')
  }
  
  async getTicketById(id) {
    return await dbContext.Tickets.findById(id).populate('account')
  }
  async createTicket(body) {

    const ticket = await dbContext.Tickets.create(body)
    await ticket.populate('account event')
    return ticket
  }
  async deleteTicket(id) {
    const ticket = await dbContext.Tickets.findById(id)
    await ticket.populate('event')
    logger.log(ticket)
    if(!ticket) {
      throw new BadRequest('Ticket not found')
    }
    await ticket.remove()
    return ticket
  }
  async getAccountTickets(userInfo) {
    const found = await dbContext.Tickets.find({accountId: userInfo.id}).populate('event')
   return found
  }

}

export const ticketsService = new TicketsService()