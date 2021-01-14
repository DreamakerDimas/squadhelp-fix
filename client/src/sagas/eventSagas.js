import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
  getEventsFromLocal,
  setEventsInLocal,
  getNotificationEvents,
} from '../api/eventsController';

export function* getEvents(action) {
  yield put({ type: ACTION.GET_EVENTS_REQUEST });
  try {
    const data = yield getEventsFromLocal();
    yield put({ type: ACTION.GET_EVENTS_SUCCESS, data: data });
    yield put({ type: ACTION.CHECK_EVENTS });
  } catch (err) {
    yield put({ type: ACTION.GET_EVENTS_ERROR, error: err });
  }
}

export function* createEvent(action) {
  yield put({ type: ACTION.CREATE_EVENT_REQUEST });
  try {
    const events = yield getEventsFromLocal();
    yield events.push(action.data);
    yield setEventsInLocal(events);
    yield put({ type: ACTION.CREATE_EVENT_SUCCESS, data: events });
  } catch (err) {
    yield put({ type: ACTION.CREATE_EVENT_ERROR, error: err });
  }
}

export function* checkEvents(action) {
  //code
}
