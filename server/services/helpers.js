'use strict'

const _ = require('lodash')

const parseErrors = (nodeRestfulErrors) => {
  const errors = {}
  _.forIn(nodeRestfulErrors, ({ path, message }) => {
    errors[path] = message
  })
  return errors
}

module.exports.formatResponse = function (req, res, next) {
  const bundle = res.locals.bundle

  if (bundle.errors) {
    const errors = parseErrors(bundle.errors)
    res.status(400).json({ errors })
  } else {
    next()
  }
}
