'use strict'

const helpers = require('../services/helpers')
const Image = require('../models/image')

const setFile = (req, res, next) => {
  if (req.files) {
    req.body.file = req.files[0]
  }
  next()
}

Image.methods(['get', 'post', 'put', 'delete'])
Image.updateOptions({ new: true, runValidators: true })
Image.before('post', [helpers.validateJwt, setFile]).before('put', [helpers.validateJwt, setFile]).before('delete', helpers.validateJwt)
Image.after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  Image.register(server, '/api/images')
}
