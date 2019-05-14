'use strict'
const jwt = require('jsonwebtoken')
const helpers = require('../services/helpers')
const User = require('../models/user')
User.methods(['get', 'post', 'put', 'delete'])
User.updateOptions({ new: true, runValidators: true })
User.before('post', helpers.validateJwt).before('put', helpers.validateJwt).before('delete', helpers.validateJwt)
User.after('post', helpers.formatResponse).after('put', helpers.formatResponse)

module.exports = function (server) {
  User.register(server, '/api/users')
  server.post('/api/auth', (req, res) => {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err

      if (!user) {
        res.status(400).send({
          success: false,
          message: 'Authentication failed. User not found.'
        })
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(JSON.stringify(user), process.env.SECRET)
            res.json({
              success: true,
              message: 'Authentication successfull',
              token
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'Authentication failed. Passwords did not match.'
            })
          }
        })
      }
    })
  })
}
