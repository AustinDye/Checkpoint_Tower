import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { EventSchema } from '../models/Event'
import { TicketSchema } from '../models/Ticket'
import { CommentSchema } from '../models/Comment'

class DbContext { 
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema , 'account');
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Events = mongoose.model('Event', EventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
