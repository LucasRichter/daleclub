'use strict'

const helpers = require('../services/helpers')
const Config = require('../models/config')

Config
  .methods(['put'])
  .updateOptions({ new: true, runValidators: true })
  .route('current.get', (req, res, next) => {
    Config.findOne().then(result => res.json(result))
  })
  .before('put', helpers.validateJwt)
  .after('put', helpers.formatResponse)

module.exports = function (server) {
  Config.register(server, '/api/config')
}
