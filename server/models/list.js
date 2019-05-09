const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const listSchema = new Schema({
  event: { type: ObjectId, required: true, ref: 'Event' },
  email: { type: String, required: true },
  birthday_name: { type: String, required: true },
  names: [{ type: String, required: true }],
  birthday: { type: Date, required: true }
})

module.exports = mongoose.model('List', listSchema)
