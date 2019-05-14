'use strict'

const helpers = require('../services/helpers')
const Guest = require('../models/guest')
Guest.methods(['get', 'post', 'put', 'delete'])
Guest.updateOptions({ new: true, runValidators: true })
Guest.after('post', helpers.formatResponse).after('put', helpers.formatResponse).before('delete', helpers.validateJwt)

module.exports = function (server) {
  Guest.register(server, '/api/guests')
}
