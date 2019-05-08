'use strict'

const mongooseCrudify = require('mongoose-crudify')

const helpers = require('../services/helpers')
const List = require('../models/list')

module.exports = function (server) {
  // Docs: https://github.com/ryo718/mongoose-crudify
  server.use(
    '/api/lists',
    mongooseCrudify({
      Model: List,
      selectFields: '-__v', // Hide '__v' property
      endResponseInAction: false,

      // beforeActions: [],
      // actions: {}, // list (GET), create (POST), read (GET), update (PUT), delete (DELETE)
      afterActions: [
        { middlewares: [helpers.formatResponse] }
      ]
    })
  )
}
