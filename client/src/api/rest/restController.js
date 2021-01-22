import http from '../interceptor';

export const registerRequest = (data) => http.post('registerRequest', data);
export const loginRequest = (data) => http.post('loginRequest', data);
export const resetPasswordMailRequest = (data) =>
  http.post('resetPasswordMailRequest', data);
export const resetPassword = (data) => http.patch('resetPassword/' + data);
export const getUser = () => http.get('getUser');
export const updateContest = (data) => http.put('updateContest', data);
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.put('setOfferStatus', data);
export const downloadContestFile = (data) =>
  http.get('downloadContestFile/' + data.fileName);
export const payment = (data) => http.post('payment', data.formData);
export const changeMark = (data) => http.put('changeMark', data);
export const getPreviewChat = () => http.get('getPreviewChat');
export const getDialog = (data) => http.get('getDialog/' + data.interlocutorId);
export const dataForContest = (data) => http.post('dataForContest', data);
export const cashOut = (data) => http.post('cashOut', data);
export const updateUser = (data) => http.put('updateUser', data);
export const newMessage = (data) => http.post('newMessage', data);
export const changeChatFavorite = (data) =>
  http.put('changeChatFavorite', data);
export const changeChatBlock = (data) => http.put('changeChatBlock', data);
export const getCatalogList = () => http.get('getCatalogList');
export const addChatToCatalog = (data) => http.put('addChatToCatalog', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const deleteCatalog = (data) =>
  http.delete('deleteCatalog/' + data.catalogId);
export const removeChatFromCatalog = (data) =>
  http.delete('removeChatFromCatalog/' + `${data.catalogId}/` + data.chatId);
export const changeCatalogName = (data) => http.put('changeCatalogName', data);
export const getCustomersContests = (data) => {
  return http.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );
};

export const getAllActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) => {
  return http.post('getAllActiveContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });
};

export const getContestById = (data) => {
  return http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
};

export const getAllPendingOffers = (data) =>
  http.post('getAllPendingOffers', {
    limit: data.limit,
    offset: data.offset,
    order: data.order,
  });

export const updateOfferModerationStatus = (data) =>
  http.put('updateOfferModerationStatus', data);
