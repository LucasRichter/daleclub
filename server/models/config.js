const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const configSchema = new Schema({
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  twitter_user: { type: String },
  number_events: { type: Number, default: 4 },
  contact_email: { type: String }
})

module.exports = restful.model('ConfigSchema', configSchema)
