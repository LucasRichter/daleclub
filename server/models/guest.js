const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const eventsSchema = new Schema({
  event: { type: ObjectId, required: true, ref: 'Event' },
  email: { type: String, required: true },
  name: { type: String, required: true }
})

module.exports = mongoose.model('Guest', eventsSchema)
