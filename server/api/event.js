'use strict'

const helpers = require('../services/helpers')
const Event = require('../models/event')

const setFile = (req, res, next) => {
  if (req.files) {
    req.body.cover = req.files[0]
  }
  next()
}

Event.methods(['get', 'post', 'put', 'delete'])
Event.updateOptions({ new: true, runValidators: true })
Event.before('post', [helpers.validateJwt, setFile]).before('put', [helpers.validateJwt, setFile]).before('delete', helpers.validateJwt)
Event.after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  Event.register(server, '/api/events')
}
