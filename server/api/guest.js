'use strict'

const helpers = require('../services/helpers')
const Guest = require('../models/guest')
const Event = require('../models/event')

const invite = async (req, res, next) => {
  const { event, names, email } = req.body
  if (!event) {
    return res.status(400).json({ message: 'Você precisa enviar uma festa!' })
  }

  const currentEvent = await Event.findOne({ _id: event })

  if (!currentEvent) {
    return res.status(400).json({ message: 'Festa não existe' })
  }

  if (!names || names.length === 0) {
    return res.status(400).json({ message: 'Nenhum nome a ser adicionado!' })
  }

  const guests = []

  for (let name of names) {
    guests.push({ event, email, name })
  }

  await Guest.insertMany(guests)

  return res.status(201).json({ success: true })
}

Guest
  .methods(['get', 'post', 'put', 'delete'])
  .route('invite.post', (req, res, next) => invite(req, res, next))
  .updateOptions({ new: true, runValidators: true })
  .before('put', helpers.validateJwt)
  .after('post', helpers.formatResponse)
  .after('put', helpers.formatResponse)
  .before('delete', helpers.validateJwt)

module.exports = function (server) {
  Guest.register(server, '/api/guests')
}
