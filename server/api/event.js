'use strict'

const helpers = require('../services/helpers')
const Event = require('../models/event')

const setFile = (req, res, next) => {
  req.body.cover = req.file
  next()
}

Event.methods(['get', 'post', 'put', 'delete'])
Event.updateOptions({ new: true, runValidators: true })
Event.before('post', setFile).before('put', setFile)
Event.after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  Event.register(server, '/api/events')
}
