const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const mongooseThumbnailLib = require('mongoose-thumbnail')
const mongooseThumbnailPlugin = mongooseThumbnailLib.thumbnailPlugin

const eventsSchema = new Schema({
  show: { type: Boolean, default: true }
})

eventsSchema.plugin(mongooseThumbnailPlugin, {
  name: 'file'
})

module.exports = restful.model('Image', eventsSchema)
