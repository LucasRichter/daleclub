const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const mongooseThumbnailLib = require('mongoose-thumbnail')
const mongooseThumbnailPlugin = mongooseThumbnailLib.thumbnailPlugin

const eventsSchema = new Schema({
  permalink: { type: String, required: true, unique: true },
  edition: { type: String, default: '' },
  party: { type: String, unique: true, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  guests: { type: Boolean, default: true },
  lists: { type: Boolean, default: true },
  show: { type: Boolean, default: true }
})

eventsSchema.plugin(mongooseThumbnailPlugin, {
  name: 'cover'
})

module.exports = restful.model('Event', eventsSchema)
