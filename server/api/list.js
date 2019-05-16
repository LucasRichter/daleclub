'use strict'

const helpers = require('../services/helpers')
const List = require('../models/list')
const Event = require('../models/event')
const moment = require('moment')

const validateDate = async (req, res, next) => {
  const { event, birthday, cpf } = req.body
  const today = moment()
  const initYear = moment(today).startOf('year')
  const endYear = moment(today).endOf('year')
  const hasListInYear = await List.findOne({ cpf })
  const birthdayDate = moment(birthday, 'YYYY-MM-DD')

  if (hasListInYear && birthdayDate.isBetween(initYear, endYear)) {
    return res.status(400).json({ message: 'Já foi enviado uma lista com esse CPF este ano!' })
  }

  if (!event) {
    return res.status(400).json({ message: 'Você precisa enviar uma festa!' })
  }

  const currentEvent = await Event.findOne({ _id: event })

  if (!currentEvent) {
    return res.status(400).json({ message: 'Festa não existe' })
  }

  const eventDate = moment(currentEvent.date)

  if (parseInt(eventDate.diff(birthdayDate, 'd')) > 4) {
    return res.status(400).json({ message: 'A data de aniversário precisa ter no máximo 4 dias de diferença!' })
  }
  next()
}

List.methods(['get', 'post', 'put', 'delete'])
  .updateOptions({ new: true, runValidators: true })
  .before('put', helpers.validateJwt)
  .before('post', validateDate)
  .after('post', helpers.formatResponse)
  .after('put', helpers.formatResponse)
  .before('delete', helpers.validateJwt)

module.exports = function (server) {
  List.register(server, '/api/lists')
}
