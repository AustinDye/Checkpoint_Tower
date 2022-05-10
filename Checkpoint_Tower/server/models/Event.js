import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const EventSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  coverImg: { type: String },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: String, required: true },
  type: { type: String, required: true },
  isCanceled: { type: Boolean, default: false},
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' }
},
{ timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})