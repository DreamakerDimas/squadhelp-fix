const nodemailer = require('nodemailer');
const { NODEMAILER_SETTINGS } = require('../../../constants');

module.exports = nodemailer.createTransport(NODEMAILER_SETTINGS);
