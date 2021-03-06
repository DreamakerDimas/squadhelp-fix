const db = require('../models/index');
const ServerError = require('../errors/ServerError');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const contestQueries = require('./queries/contestQueries');
const {
  updateOffer,
  updateOfferStatus,
  createOffer,
} = require('./queries/offerQueries');
const CONSTANTS = require('../constants');

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId: orderId },
    transaction
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  );
  const updatedOffers = await updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId: contestId,
    },
    transaction
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);

  return updatedOffers.find((offer) => offer.id === offerId);
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    let result = await createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getAllPendingOffers = async (req, res, next) => {
  try {
    const { order, offset, limit } = req.body;
    const { count, rows: offers } = await db.Offers.findAndCountAll({
      where: { moderationStatus: CONSTANTS.MODERATION_STATUS_PENDING },
      attributes: { exclude: ['status', 'moderationStatus'] },
      order: [['id', order]],
      offset,
      limit,
    });

    if (count <= offset + limit) {
      return res.send({ offers, haveMore: false });
    }
    return res.send({ offers, haveMore: true });
  } catch (err) {
    next(err);
  }
};

module.exports.updateOfferModerationStatus = async (req, res, next) => {
  const { id, isAccepted } = req.body;
  try {
    const offer = await db.Offers.findOne({
      where: {
        id,
        moderationStatus: CONSTANTS.MODERATION_STATUS_PENDING,
      },
    });
    if (isAccepted) {
      offer.moderationStatus = CONSTANTS.MODERATION_STATUS_CHECKED;
    } else {
      offer.moderationStatus = CONSTANTS.MODERATION_STATUS_REJECTED;
    }
    await offer.save();
    req.body.offer = offer;
    next();
  } catch (err) {
    next(err);
  }
};
