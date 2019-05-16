const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const isValidCpf = require('@brazilian-utils/is-valid-cpf')

const listSchema = new Schema({
  event: { type: ObjectId, required: true, ref: 'Event' },
  email: { type: String, required: [true, 'Você precisa de um email!'] },
  cpf: { type: String, required: [true, 'CPF?'], validate: { validator: isValidCpf, message: props => `${props.value} é um CPF inválido!` } },
  birthday_name: { type: String, required: [true, 'Você não tem nome?'] },
  names: { type: [String], required: [true, 'Você precisa de convidados!'] },
  birthday: { type: Date, required: [true, 'Você não nasceu ainda?'] }
})

module.exports = restful.model('List', listSchema)
