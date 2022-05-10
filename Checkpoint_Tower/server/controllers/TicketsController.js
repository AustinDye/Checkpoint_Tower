import { Auth0Provider } from "@bcwdev/auth0provider";
import { logger } from '../utils/Logger.js'
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

export class TicketsController extends BaseController { 
  constructor() {
    super('api/tickets')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .delete('/:id', this.deleteTicket)
    .post('', this.createTicket)
  }

  async createTicket(req, res, next) {
    try {
      const event = await eventsService.getById(req.body.eventId)
      if ( event.capacity > 0) {
          req.body.accountId = req.userInfo.id
          const ticket = await ticketsService.createTicket(req.body)
          const updatedEvent = ticket.event
          updatedEvent.capacity -= 1
          const event = await eventsService.editEvent(updatedEvent)
        
         res.send(ticket)
      }
    
  

     
    } catch (error) {
      next(error)
    }
  }
  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.getTicketById(req.params.id)
      if (ticket) {
        if (ticket.account.id == req.userInfo.id) {
          const deletedTicket = await ticketsService.deleteTicket(req.params.id)
          const updatedEvent = deletedTicket.event
          updatedEvent.capacity += 1
          const event = await eventsService.editEvent(updatedEvent)
          res.send(ticket)
        }
        next(Forbidden)
      }
      next(BadRequest)
    } catch (error) {
      next(error)
    }
  }
 
}