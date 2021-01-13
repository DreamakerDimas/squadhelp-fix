const nodemailer = require('nodemailer');
const { NODE_MAILER_SETTINGS } = require('../../../constants');

module.exports = nodemailer.createTransport(NODE_MAILER_SETTINGS);
