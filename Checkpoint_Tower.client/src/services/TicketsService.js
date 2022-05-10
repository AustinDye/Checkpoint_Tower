
import { AppState } from "../AppState";
import { Ticket } from "../models/Ticket";
import { api } from "./AxiosService";

class TicketsService { 
  async createTicket(data){
   const res = await api.post('api/tickets', data)
    return new Ticket(res.data)
  }
 
 async deleteTicket(id) {
   AppState.tickets = AppState.tickets.filter(t => t.id !== id)
   const res = await api.delete('api/tickets/' + id)
 }
 
 async getUserTickets() {
   const res = await api.get('/account/tickets')
  AppState.tickets = res.data
  console.log("tickets", res.data)
 }
   async getEventTickets(eventId) {
   const res = await api.get('/api/events/' + eventId + '/tickets')
  AppState.tickets = res.data
  console.log("tickets", res.data)
 }
}

export const ticketsService = new TicketsService()