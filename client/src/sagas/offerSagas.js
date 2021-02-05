import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from '../constants';

export function* changeMarkSaga(action) {
  try {
    const { data } = yield restController.changeMark(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === action.data.offerId) {
        offer.mark = action.data.mark;
      }
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: offers });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error: err.response });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers });

    // update contestsList
    const contestId = action.data.get('contestId');
    const contests = yield select((state) => state.contestsList.contests);
    const newContests = contests.map((contest) => {
      if (contest.id === Number(contestId)) {
        contest.Offers = offers.map((offer) => offer.id);
        contest.count++;
      }
      return contest;
    });
    yield put({ type: ACTION.UPDATE_CONTESTS, data: newContests });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {
  try {
    const { data } = yield restController.setOfferStatus(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (data.status === CONSTANTS.OFFER_STATUS_WON) {
        offer.status =
          data.id === offer.id
            ? CONSTANTS.OFFER_STATUS_WON
            : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (data.id === offer.id) {
        offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }
    });
    yield put({ type: ACTION.CHANGE_STORE_FOR_STATUS, data: offers });
  } catch (e) {
    yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response });
  }
}

export function* getModeratedOffersSaga(action) {
  yield put({ type: ACTION.GET_OFFERS_REQUEST });
  try {
    const response = yield restController.getAllPendingOffers(action.data);
    const { haveMore } = response.data;

    const store = yield select((state) => state.offersStore);
    const prevOffers = store.offers;
    const offers = [...prevOffers, ...response.data.offers];
    const offset = store.settings.offset + store.settings.limit;

    yield put({
      type: ACTION.GET_OFFERS_SUCCESS,
      data: { haveMore, offers, offset },
    });
  } catch (e) {
    yield put({ type: ACTION.GET_OFFERS_ERROR, error: e.response });
  }
}

export function* moderatorOfferUpdateSaga(action) {
  yield put({ type: ACTION.MODERATOR_UPDATE_OFFER_REQUEST });
  try {
    yield restController.updateOfferModerationStatus(action.data);
    const store = yield select((state) => state.offersStore);
    --store.settings.offset;
    const { id, isAccepted } = action.data;
    const newOffers = store.offers.map((offer) =>
      offer.id === id ? { ...offer, isAccepted } : offer
    );

    yield put({
      type: ACTION.MODERATOR_UPDATE_OFFER_SUCCESS,
      data: { settings: store.settings, offers: newOffers },
    });
  } catch (e) {
    yield put({ type: ACTION.MODERATOR_UPDATE_OFFER_ERROR, error: e.response });
  }
}
