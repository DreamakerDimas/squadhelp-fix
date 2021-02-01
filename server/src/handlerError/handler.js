const { logWrite } = require('../logger');

module.exports = (err, req, res, next) => {
  console.log(err);
  logWrite(err);
  if (
    err.message ===
    'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }

  if (
    err.message ===
    'new row for relation "Banks" violates check constraint "Banks_balance_ck"'
  ) {
    err.message =
      'Sorry, but currently we have some problems. Please try again later.';
    err.code = 406;
  }

  if (!err.message || !err.code) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.code).send(err.message);
  }
};
