const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const eventsSchema = new Schema({
  event: { type: ObjectId, required: true, ref: 'Event' },
  email: { type: String, required: true },
  names: { type: [String], required: true }
})

module.exports = restful.model('Guest', eventsSchema)
