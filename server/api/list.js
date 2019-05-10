'use strict'

const helpers = require('../services/helpers')
const List = require('../models/list')
List.methods(['get', 'post', 'put', 'delete'])
List.updateOptions({ new: true, runValidators: true })
List.after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  List.register(server, '/api/lists')
}
