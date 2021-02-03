const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const db = require('../models/index');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const moment = require('moment');
const uuid = require('uuid/v1');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const { sendResetToken } = require('../utils/mail/mailsSender');
const { getPricesArr } = require('../utils/functions');

module.exports.loginRequest = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });
    await userQueries.passwordCompare(req.body.password, foundUser.password);
    const accessToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        userId: foundUser.id,
        role: foundUser.role,
        lastName: foundUser.lastName,
        avatar: foundUser.avatar,
        displayName: foundUser.displayName,
        balance: foundUser.balance,
        email: foundUser.email,
        rating: foundUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, foundUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports.registerRequest = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass })
    );
    const accessToken = jwt.sign(
      {
        firstName: newUser.firstName,
        userId: newUser.id,
        role: newUser.role,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        displayName: newUser.displayName,
        balance: newUser.balance,
        email: newUser.email,
        rating: newUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, newUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

module.exports.resetPasswordMailRequest = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });
    if (foundUser) {
      const { firstName, email } = foundUser;
      const URL = req.headers.origin + '/reset/';

      const token = jwt.sign(
        { email, hashPass: req.hashPass },
        CONSTANTS.JWT_SECRET,
        {
          expiresIn: CONSTANTS.ACCESS_TOKEN_TIME,
        }
      );

      await sendResetToken(firstName, email, URL, token);

      res.send('Reset mail was successfully sent');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { email, hashPass } = req.tokenData;
    const { id } = await userQueries.findUser({ email });

    if (id) {
      await userQueries.updateUser({ password: hashPass }, id);
      res.send('Password was successfully reset');
    }
  } catch (err) {
    next(err);
  }
};

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () =>
    ratingQueries.createRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction
    );
  const getUpdateQuery = () =>
    ratingQueries.updateRating({ mark }, { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  try {
    transaction = await db.sequelize.transaction({
      isolationLevel:
        db.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await db.Ratings.findAll({
      include: [
        {
          model: db.Offers,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  const { contests, number, cvc, expiry } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const price = Number(req.body.price);
    await bankQueries.updateBankBalance(
      {
        balance: db.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${number.replace(/ /g, '')}' 
            AND "cvc"='${cvc}' 
            AND "expiry"='${expiry}'
                THEN "balance"-${price}
            WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' 
            AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}' 
            AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
                THEN "balance"+${price} 
            END
        `),
      },
      {
        cardNumber: {
          [db.sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );
    const orderId = uuid();

    const pricesArr = getPricesArr(price, contests.length);
    contests.forEach((contest, index) => {
      const prize = pricesArr[index];
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });

    await db.Contests.bulkCreate(contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await userQueries.updateUser(
      req.body,
      req.tokenData.userId
    );
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashOut = async (req, res, next) => {
  const { sum, number, expiry, cvc } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const updatedUser = await userQueries.updateUser(
      { balance: db.sequelize.literal('balance - ' + sum) },
      req.tokenData.userId,
      transaction
    );
    await bankQueries.updateBankBalance(
      {
        balance: db.sequelize.literal(`CASE 
                WHEN "cardNumber"='${number.replace(/ /g, '')}' 
                AND "expiry"='${expiry}' 
                AND "cvc"='${cvc}'
                    THEN "balance"+${sum}
                WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' 
                AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}' 
                AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
                    THEN "balance"-${sum}
                END
                `),
      },
      {
        cardNumber: {
          [db.sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
