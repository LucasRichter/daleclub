'use strict'

const helpers = require('../services/helpers')
const sendEmail = require('../services/sendEmail')
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

const sendConfirm = async (req, res, next) => {
  const { bundle } = res.locals
  const currentEvent = await Event.findOne({ _id: bundle.event })

  await sendEmail(bundle.email, 'Lista confirmada!', `
    <p>Olá <strong>${bundle.birthday_name}</strong>! A sua lista para a festa <strong>${currentEvent.party}</strong> está confirmada com os nomes:</p>
    <ol>
    ${bundle.names.map(n => `<li>${n}</li>`).join('')}
    </ol>
  `)

  next()
}

List.methods(['get', 'post', 'put', 'delete'])
  .updateOptions({ new: true, runValidators: true })
  .before('put', helpers.validateJwt)
  .before('post', validateDate)
  .after('post', [sendConfirm, helpers.formatResponse])
  .after('put', helpers.formatResponse)
  .before('delete', helpers.validateJwt)

module.exports = function (server) {
  List.register(server, '/api/lists')
}
