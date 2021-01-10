import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import history from '../browserHistory';
import * as restController from '../api/rest/restController';

export function* loginSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield restController.loginRequest(action.data);
    history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
  }
}

export function* registerSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield restController.registerRequest(action.data);
    history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response });
  }
}

export function* resetMailSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    const data = yield restController.resetPasswordMailRequest(action.data);
    yield put({ type: ACTION.AUTH_ACTION_RESET_SEND_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_RESET_SEND_ERROR, error: e.response });
  }
}

export function* resetUserPasswordSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield restController.resetPassword(action.data);
    yield put({ type: ACTION.AUTH_ACTION_RESET_SUCCESS });
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.AUTH_ACTION_RESET_ERROR, error: e.response });
  }
}
