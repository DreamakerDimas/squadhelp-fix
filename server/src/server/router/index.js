const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPass');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const {
  checkAuth,
  checkToken,
  resetPasswordTokenCheck,
} = require('../middlewares/tokenCheckers');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post(
  '/registerRequest',
  validators.validateRegistrationData,
  hashPass,
  userController.registerRequest
);

router.post(
  '/loginRequest',
  validators.validateLoginData,
  userController.loginRequest
);

router.post(
  '/resetPasswordMailRequest',
  userController.resetPasswordMailRequest
);

router.get(
  '/resetPassword/:token',
  resetPasswordTokenCheck,
  userController.resetPassword
);

router.post('/dataForContest', checkToken, contestController.dataForContest);

router.post(
  '/payment',
  checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

router.post(
  '/getCustomersContests',
  checkToken,
  contestController.getCustomersContests
);

router.get(
  '/getContestById',
  checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

router.post(
  '/getAllActiveContests',
  checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getAllActiveContests
);

router.get('/getUser', checkAuth);

router.get(
  '/downloadContestFile/:fileName',
  checkToken,
  contestController.downloadContestFile
);

router.put(
  '/updateContest',
  checkToken,
  upload.updateContestFile,
  contestController.updateContest
);

router.post(
  '/setNewOffer',
  checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.post(
  '/setOfferStatus',
  checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.put(
  '/changeMark',
  checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

router.put(
  '/updateUser',
  checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

router.post(
  '/cashOut',
  checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashOut
);

router.post('/newMessage', checkToken, chatController.newMessage);

router.get('/getDialog/:interlocutorId', checkToken, chatController.getDialog);

router.get('/getPreviewChat', checkToken, chatController.getPreviewChat);

router.put('/changeChatBlock', checkToken, chatController.changeChatBlock);

router.put(
  '/changeChatFavorite',
  checkToken,
  chatController.changeChatFavorite
);

router.post('/createCatalog', checkToken, chatController.createCatalog);

router.put('/changeCatalogName', checkToken, chatController.changeCatalogName);

router.put('/addChatToCatalog', checkToken, chatController.addChatToCatalog);

router.delete(
  '/removeChatFromCatalog/:catalogId/:chatId',
  checkToken,
  chatController.removeChatFromCatalog
);

router.delete(
  '/deleteCatalog/:catalogId',
  checkToken,
  chatController.deleteCatalog
);

router.get('/getCatalogList', checkToken, chatController.getCatalogList);

module.exports = router;
