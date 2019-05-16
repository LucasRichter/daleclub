'use strict'

const helpers = require('../services/helpers')
const Event = require('../models/event')
const Guest = require('../models/guest')
const List = require('../models/list')
const formatCpf = require('@brazilian-utils/format-cpf')

const setFile = (req, res, next) => {
  if (req.files && req.files[0]) {
    req.body.cover = req.files[0]
  }
  next()
}

const listImpress = async id => {
  const event = await Event.findOne({ _id: id })
  const lists = await List.find({ event: id })
  const guests = await Guest.find({ event: id })
  let html = ''

  html += `<h2>${event.party} // ${event.edition}</h2><h3>Lista Desconto</h3>`

  let guestsHtml = ''
  for (let guest of guests) {
    guestsHtml += `<li>${guest.name}</li>`
  }

  html += `<ol>${guestsHtml}</ol><h3>Aniversariantes</h3>`
  let listHtml = ''
  let birthday = ''
  for (let list of lists) {
    birthday += `<li>${list.birthday_name} - ${formatCpf(list.cpf)}</li>`
    for (let name of list.names) {
      listHtml += `<li>${name}</li>`
    }
  }

  html += `<ol>${birthday}</ol><h3>Convidados dos Aniversariantes</h3><ol>${listHtml}</ol>
    <style type='text/css'>
    @media screen, print {
      body {
        font-family: 'Courier';
        font-size: 10;
      }
    
      #wrapper {
        width: 800px;
      }
      ol {
        -webkit-column-count: 2;
        -webkit-column-gap: 10px;
        -webkit-column-fill: auto;
    
        -moz-column-count: 2;
        -moz-column-gap: 10px;      
    
        column-count: 2;
        column-gap: 10px;
        column-fill: auto;
      }
    }
    </style>
  `
  return `<div id='wrapper'>${html}</div>`
}

const afterGet = async (req, res, next) => {
  const { bundle } = res.locals

  if (Array.isArray(bundle)) {
    const newBundle = []

    for (let {_doc} of bundle) {
      const birthdayCount = await List.count({ event: _doc._id })
      const guestCount = await Guest.count({ event: _doc._id })
      newBundle.push({
        ..._doc,
        birthday_count: birthdayCount,
        guest_count: guestCount
      })
    }

    res.locals.bundle = newBundle
  } else {
    const { _doc } = bundle
    const birthdayCount = await List.count({ event: _doc._id })
    const guestCount = await Guest.count({ event: _doc._id })
    _doc.birthday_count = birthdayCount
    _doc.guest_count = guestCount
  }

  next()
}

Event
  .methods(['get', 'post', 'put', 'delete'])
  .route('list.get', {
    detail: true,
    handler: async (req, res, next) => {
      // req.params.id holds the resource's id
      const html = await listImpress(req.params.id)
      res.send(html)
    }
  })
  .updateOptions({ new: true, runValidators: true })
  .after('get', afterGet)
  .before('post', [helpers.validateJwt, setFile])
  .before('put', [helpers.validateJwt, setFile])
  .before('delete', helpers.validateJwt)
  .after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  Event.register(server, '/api/events')
}
