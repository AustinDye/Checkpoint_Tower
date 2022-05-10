import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

export class EventsController extends BaseController { 
  constructor() {
    super('api/events')
    this.router
    .get('', this.getEvents)
    .get('/:id', this.getEventById)
    .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
      .get('/:id/comments', this.getComments)
      .get('/:id/tickets', this.getTicketsForEvent)

  }
  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.getById(req.params.id)
      if (event) {
        if (event.creatorId == req.account.id) {
        const event = await eventsService.cancelEvent(req.params)
      res.send(event)
        }
        next(Forbidden)
      }
      next(BadRequest)
    } catch (error) {
      next(error)
    }
  }
   async getTicketsForEvent(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsForEvent(req.params)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEvents(req, res, next) {
    try {
      const events = await eventsService.getEvents()
      res.send(events)
    }
    catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const event = await eventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      const event = await eventsService.getById(req.params.id)
      if (event) {
        if (event.creatorId == req.userInfo.id) {
          req.body.id = req.params.id
          const event = await eventsService.editEvent(req.body, req.userInfo.id)
          res.send(event)
        }
        next(Forbidden)
      }
      next(BadRequest)
    } catch (error) {
      next(error)
    }
  }
}

