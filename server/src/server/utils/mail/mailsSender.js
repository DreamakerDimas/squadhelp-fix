const mailTransporter = require('./mailTransporter');

module.exports.sendToken = async (firstName, recipient, token) => {
  const mailOptions = {
    from: 'dart.dimas@gmail.com',
    to: recipient,
    subject: 'Squadhelp password reset',
    html: `<h3>${firstName}</h3> <hr/> <p>Someone requested that the password for your Squadhelp account be reset.</p> <p>For reset password follow this link: ${token}, or copy it to address bar of your browser. After that new password will be send to your mail.</p> <p>If you didn't request this, you can ignore this email or let us know.</p>`,
  };

  mailTransporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports.sendNewPassword = async (firstName, recipient, pass) => {
  const mailOptions = {
    from: 'dart.dimas@gmail.com',
    to: recipient,
    subject: 'Squadhelp new password',
    html: `<h3>${firstName},</h3> <h4>your password was successfully reset</h4> <p>New password: "${pass}" (without quotes). Use it to login into your account.</p>`,
  };
};
