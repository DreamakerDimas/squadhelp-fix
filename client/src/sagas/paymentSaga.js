import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import history from '../browserHistory';
import CONSTANTS from '../constants';
import * as restController from '../api/rest/restController';

export function* paymentSaga(action) {
  yield put({ type: ACTION.PAYMENT_ACTION_REQUEST });
  try {
    yield restController.payment(action.data);
    history.replace('dashboard');
    yield put({ type: ACTION.CLEAR_CONTEST_STORE });
    yield put({ type: ACTION.PAYMENT_ACTION_SUCCESS });
  } catch (err) {
    yield put({ type: ACTION.PAYMENT_ACTION_ERROR, error: err.response });
  }
}

export function* cashOutSaga(action) {
  yield put({ type: ACTION.PAYMENT_ACTION_REQUEST });
  try {
    const { data } = yield restController.cashOut(action.data);
    yield put({ type: ACTION.UPDATE_USER_DATA_SUCCESS, data });
    yield put({ type: ACTION.CLEAR_PAYMENT_STORE });
    yield put({
      type: ACTION.CHANGE_PROFILE_MODE_VIEW,
      data: CONSTANTS.USER_INFO_MODE,
    });
  } catch (e) {
    yield put({ type: ACTION.PAYMENT_ACTION_ERROR, error: e.response });
  }
}
