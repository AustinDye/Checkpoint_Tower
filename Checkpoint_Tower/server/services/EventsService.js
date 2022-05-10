import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";
import { logger } from "../utils/Logger";



class EventsService {
  async getEvents() {
    const events = await dbContext.Events.find({})
    return events
  }
  async getById(id) {
    const event = await dbContext.Events.findById(id)
    if (!event) {
      throw new BadRequest('Event not found')
    }
    return event
  }
  async createEvent(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator', 'picture name')
    console.log(event)
    return event
  }
 
  async editEvent(newEvent, userId) {
    logger.log(newEvent)
    const event = await dbContext.Events.findById(newEvent.id)
    logger.log(event)
    if (!event) {
      throw new BadRequest('Could not find event')
    }
    if (event.isCanceled == true) {
      throw new BadRequest('Could not edit canceled events')
    }
    event.name = newEvent.name || event.name
    event.description = newEvent.description || event.description
    event.capacity = newEvent.capacity || event.capacity
 
    await event.save(event)
    return event
  }
  
  async cancelEvent(canceledEvent) {
    const event = await dbContext.Events.findById(canceledEvent.id)
    event.isCanceled = true
    await event.save(event)
    return event
  }
}

export const eventsService = new EventsService()