import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"
class EventsService { 
  async getAllEvents() {
   const res = await api.get('api/events')
   console.log(res.data);
    AppState.events = res.data.map(e => new Event(e))
  }

  async setActiveEvent(id){
  const res = await api.get('api/events/' + id)
    AppState.activeEvent = new Event(res.data)
    console.log("active event",AppState.activeEvent)
}
  async createEvent(data){
    const res = await api.post('api/events', data)
    AppState.events.unshift(new Event(res.data))
    return new Event(res.data)
  }
  
  async cancelEvent(id) {
    const res = await api.delete('api/events/' + id)
    AppState.events = AppState.events.filter((e) => e.id !== e.id)
  }

  async filterEventsByType(type) {
    AppState.events = AppState.events.filter((e) => e.type == type)
  }


}

export const eventsService = new EventsService()