const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventsSchema = new Schema({
  permalink: { type: String, required: true, unique: true },
  edition: { type: String, default: '' },
  party: { type: String, unique: true, required: true },
  date: { type: Date, required: true },
  cover: { type: String, required: true },
  description: { type: String, required: true },
  has_guests: { type: Boolean, default: true },
  has_birthday_lists: { type: Boolean, default: true },
  list_closed: { type: Boolean, default: false },
  show: { type: Boolean, default: true }
})

module.exports = mongoose.model('Event', eventsSchema)
