const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  service: 'DebugMail',
  auth: {
    user: 'dart.dimas@gmail.com',
    pass: '52c4f6c0-50fd-11eb-875f-87492950ae45',
  },
});
