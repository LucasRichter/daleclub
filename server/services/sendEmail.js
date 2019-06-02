const nodemailer = require('nodemailer')
const Config = require('../models/config')

// async..await is not allowed in global scope, must use a wrapper
async function main(to, subject, html, text) {
  // create reusable transporter object using the default SMTP transport
  const currentConfig = await Config.findOne()
  let transporter = nodemailer.createTransport({
    host: 'smtp.kinghost.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'smtp@daleclub.com.br', // generated ethereal user
      pass: 'pqpqpq6' // generated ethereal password
    }
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"Daleclub 👻" <${currentConfig.contact_email}>'`,
    to,
    subject,
    html: `
      <a href='https://daleclub.com.br' target='_blank'>
        <picture>
          <source srcSet='https://daleclub.com.br/static/logo-mobi.png' media='(max-width: 600px)' >
          <img src='https://daleclub.com.br/static/logo.png' alt='Logo' >
        </picture>
      </a>
      <div>
        ${html}

        <p>Vamo dale!</p>
      </div>
      <style type='text/css'>
        img {
          cursor: pointer;
          max-width: 100px !important;
        }

        strong {
          font-weight: 600;
        }

        * {
          font-size: 15px;
        }

        ol {
          -webkit-column-count: 2;
          -webkit-column-gap: 15px;
          -webkit-column-fill: auto;

          -moz-column-count: 2;
          -moz-column-gap: 15px;

          column-count: 2;
          column-gap: 15px;
          column-fill: auto;
        }
      </style>
    `
  })
}

module.exports = main
