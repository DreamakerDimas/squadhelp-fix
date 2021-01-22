const db = require('../models/index');

const userQueries = require('./queries/userQueries');
const { sendOfferModerationStatus } = require('../utils/mail/mailsSender');

module.exports.sendOfferModerationStatus = async (req, res, next) => {
  const {
    userId,
    contestId,
    text,
    originalFileName,
    moderationStatus,
  } = req.body.offer;

  try {
    const foundUser = await userQueries.findUser({ id: userId });
    const foundContest = await db.Contests.findOne({
      where: { id: contestId },
    });
    const { firstName, email } = foundUser;
    const { title } = foundContest;

    if (text) {
      // For names
      await sendOfferModerationStatus(
        firstName,
        email,
        title,
        text,
        moderationStatus
      );
    } else {
      // For logos
      await sendOfferModerationStatus(
        firstName,
        email,
        title,
        originalFileName,
        moderationStatus
      );
    }
    return res.send('success');
  } catch (err) {
    next(err);
  }
};
