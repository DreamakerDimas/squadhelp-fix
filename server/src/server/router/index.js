const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post(
  '/registerRequest',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/loginRequest', validators.validateLogin, userController.login);

router.get(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest
);

router.post(
  '/payment',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

router.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests
);

router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

router.post(
  '/getAllActiveContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

router.get('/getUser', checkToken.checkAuth);

router.get(
  '/downloadContestFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile
);

router.put(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.put(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

router.put(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

router.post(
  '/cashOut',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashOut
);

router.post('/newMessage', checkToken.checkToken, chatController.addMessage);

router.post('/getDialog', checkToken.checkToken, chatController.getDialog);

router.get('/getPreviewChat', checkToken.checkToken, chatController.getPreview);

router.put('/changeChatBlock', checkToken.checkToken, chatController.blackList);

router.put(
  '/changeChatFavorite',
  checkToken.checkToken,
  chatController.favoriteChat
);

router.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog
);

router.put(
  '/changeCatalogName',
  checkToken.checkToken,
  chatController.updateNameCatalog
);

router.put(
  '/addChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog
);

router.delete(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog
);

router.delete(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog
);

router.get(
  '/getCatalogList',
  checkToken.checkToken,
  chatController.getCatalogs
);

module.exports = router;
