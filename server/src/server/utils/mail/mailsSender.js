const transporter = require('./mailTransporter');
const { MAIL_ADDRESS } = require('../../../constants');

module.exports.sendResetToken = async (firstName, recipient, URL, token) => {
  const mailOptions = {
    from: MAIL_ADDRESS,
    to: recipient,
    subject: 'Squadhelp password reset',
    html: `<h3>Dear ${firstName},</h3> <p>Someone requested that the password for your Squadhelp account be reset. <br/> For reset password follow this link: <a href="${URL}${token}">Reset Password</a>.</p> <p>Or copy next link into address bar of your browser: <br/> ${URL}${token}</p> <p>If you didn't request this, you can ignore this email or let us know.</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
