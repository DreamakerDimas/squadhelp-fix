const db = require('../models/index');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuid = require('uuid/v4');

// return sorted Array
const getSortedParticipantsArray = (user, recipient) =>
  [user, recipient].sort((id1, id2) => id1 - id2);

// return conversation obj for response
const formConversationObj = (conversations) => {
  return conversations.map((data) => {
    const {
      _id,
      participants,
      blackList,
      favoriteList,
      Messages: [message],
    } = data.toJSON();

    if (message)
      return {
        _id,
        participants,
        blackList,
        favoriteList,
        sender: message.sender,
        text: message.body,
        createAt: message.createdAt,
      };

    return {
      _id,
      participants,
      blackList,
      favoriteList,
    };
  });
};

// return catalog obj for response
const formCatalogObj = (catalog) => {
  const { _id, catalogName, Conversations } = catalog.toJSON();
  const chats = Conversations.map((conv) => conv._id);

  return { _id, catalogName, chats };
};

module.exports.newMessage = async (req, res, next) => {
  const {
    userId,
    firstName,
    lastName,
    displayName,
    avatar,
    email,
  } = req.tokenData;
  const participants = getSortedParticipantsArray(userId, req.body.recipient);

  const transaction = await db.sequelize.transaction();
  try {
    const [conversation] = await db.Conversations.findOrCreate({
      where: {
        participants,
      },
      defaults: {
        participants,
      },
      transaction,
    });

    const newMessage = new db.Messages({
      sender: userId,
      body: req.body.messageBody,
      conversation: conversation._id,
    });
    await newMessage.save({ transaction });

    const message = { ...newMessage.toJSON(), participants };

    const interlocutorId = req.body.recipient;
    const preview = {
      _id: conversation._id,
      sender: userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: conversation.blackList,
      favoriteList: conversation.favoriteList,
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });

    await transaction.commit();
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.getDialog = async (req, res, next) => {
  const participants = getSortedParticipantsArray(
    req.tokenData.userId,
    Number(req.params.interlocutorId)
  );

  try {
    const conversation = await db.Conversations.findOne({
      where: {
        participants,
      },
      include: {
        model: db.Messages,
        order: [['createdAt', 'ASC']],
      },
    });
    const { Messages: messages } = conversation.toJSON();

    const {
      firstName,
      lastName,
      displayName,
      id,
      avatar,
    } = await userQueries.findUser({
      id: req.params.interlocutorId,
    });

    res.send({
      messages,
      interlocutor: {
        firstName,
        lastName,
        displayName,
        id,
        avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreviewChat = async (req, res, next) => {
  try {
    const conversations = await db.Conversations.findAll({
      where: {
        participants: { [Op.contains]: [req.tokenData.userId] },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: db.Messages,
        order: [['createdAt', 'DESC']],
        limit: 1,
      },
    });
    const conversationsList = formConversationObj(conversations);

    const interlocutors = [];
    conversationsList.forEach((conversation) => {
      interlocutors.push(
        conversation.participants.find(
          (participant) => participant !== req.tokenData.userId
        )
      );
    });

    const senders = await db.Users.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    conversationsList.forEach((conversation) => {
      senders.forEach((sender) => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          const {
            id,
            firstName,
            lastName,
            displayName,
            avatar,
          } = sender.dataValues;

          conversation.interlocutor = {
            id,
            firstName,
            lastName,
            displayName,
            avatar,
          };
        }
      });
    });

    res.send(conversationsList);
  } catch (err) {
    next(err);
  }
};

module.exports.changeChatBlock = async (req, res, next) => {
  try {
    const chat = await db.Conversations.findOne({
      where: {
        participants: req.body.participants,
      },
    });
    const index = chat.participants.indexOf(req.tokenData.userId);

    const newBlackList = chat.blackList;
    newBlackList[index] = req.body.blackListFlag;

    chat.update({ blackList: newBlackList });

    const chatObj = chat.toJSON();
    const interlocutorId = chatObj.participants.filter(
      (participant) => participant !== req.tokenData.userId
    )[0];
    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, chatObj);

    res.send(chatObj);
  } catch (err) {
    res.send(err);
  }
};

module.exports.changeChatFavorite = async (req, res, next) => {
  try {
    const chat = await db.Conversations.findOne({
      where: {
        participants: req.body.participants,
      },
    });
    const index = chat.participants.indexOf(req.tokenData.userId);

    const newFavoriteList = chat.favoriteList;
    newFavoriteList[index] = req.body.favoriteFlag;

    chat.update({ favoriteList: newFavoriteList });

    const chatObj = chat.toJSON();
    res.send(chatObj);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const catalogId = uuid();
  const transaction = await db.sequelize.transaction();

  try {
    const newCatalog = await db.Catalogs.create(
      {
        _id: catalogId,
        userId: req.tokenData.userId,
        catalogName: req.body.catalogName,
      },
      { transaction }
    );
    await db.CatalogsToConversations.create(
      {
        conversationId: req.body.chatId,
        catalogId,
      },
      { transaction }
    );

    const catalog = { ...newCatalog.toJSON(), chats: [req.body.chatId] };

    await transaction.commit();
    res.send(catalog);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

// response { _id, catalogName, chats: []}
module.exports.changeCatalogName = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      include: {
        model: db.Conversations,
      },
    });
    catalog.catalogName = req.body.catalogName;
    await catalog.save();

    const { _id, catalogName, Conversations } = catalog.toJSON();
    const chats = Conversations.map((conv) => conv._id);

    const catalogObj = { _id, catalogName, chats };

    console.log(catalogObj);
    res.send(catalogObj);
  } catch (err) {
    next(err);
  }
};

module.exports.addChatToCatalog = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const catalog = await db.Catalogs.findOne(
      {
        where: {
          _id: req.body.catalogId,
          userId: req.tokenData.userId,
        },
        include: {
          model: db.Conversations,
        },
      },
      { transaction }
    );
    await db.CatalogsToConversations.create(
      {
        conversationId: req.body.chatId,
        catalogId: req.body.catalogId,
      },
      { transaction }
    );

    const catalogObj = formCatalogObj(catalog);
    catalogObj.chats.push(req.body.chatId);

    await transaction.commit();
    res.send(catalogObj);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: {
        _id: req.params.catalogId,
        userId: req.tokenData.userId,
      },
      include: {
        model: db.Conversations,
      },
    });

    catalog.Conversations.forEach(async (conversation) => {
      if (conversation._id === req.params.chatId)
        await conversation.CatalogsToConversations.destroy();
    });

    const catalogObj = formCatalogObj(catalog);
    catalogObj.chats = catalogObj.chats.filter(
      (id) => id !== req.params.chatId
    );

    res.send(catalogObj);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: {
        _id: req.params.catalogId,
        userId: req.tokenData.userId,
      },
    });
    catalog.destroy();
    res.end();
  } catch (err) {
    next(err);
  }
};

// response [{ _id, catalogName, chats: []}]
module.exports.getCatalogList = async (req, res, next) => {
  try {
    const catalogs = await db.Catalogs.findAll({
      where: {
        userId: req.tokenData.userId,
      },
      include: {
        model: db.Conversations,
        attributes: ['_id'],
      },
    });

    const catalogsArr = catalogs.map((catalog) => formCatalogObj(catalog));

    res.send(catalogsArr);
  } catch (err) {
    next(err);
  }
};
