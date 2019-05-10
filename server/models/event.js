const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const path = require('path')
const filePluginLib = require('mongoose-file')
const filePlugin = filePluginLib.filePlugin
const makeUpload = filePluginLib.make_upload_to_model
const root = path.resolve(__dirname, '..', '..')
const uploadBase = path.join(root, 'static')

console.log(makeUpload)

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

eventsSchema.plugin(filePlugin, {
  name: 'cover',
  upload_to: uploadBase
})

module.exports = restful.model('Event', eventsSchema)
