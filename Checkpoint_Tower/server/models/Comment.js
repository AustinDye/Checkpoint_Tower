import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
   
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event'},
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  body: { type: String, required: true },
  
    
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event',
  justOne: true
})