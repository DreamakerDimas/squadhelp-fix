import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
  getEventsFromLocal,
  setEventsInLocal,
  setEventsBooleans,
  getAlarmedEventsArr,
  sortEventsArr,
} from '../api/eventsController';

export function* getEvents() {
  yield put({ type: ACTION.GET_EVENTS_REQUEST });
  try {
    const data = yield getEventsFromLocal();
    yield put({ type: ACTION.GET_EVENTS_SUCCESS, data: data });
  } catch (err) {
    console.log(err);
    yield put({ type: ACTION.GET_EVENTS_ERROR, error: err });
  }
}

export function* createEvent(action) {
  yield put({ type: ACTION.CREATE_EVENT_REQUEST });
  try {
    const events = yield getEventsFromLocal() || [];
    yield events.push(action.data);
    yield setEventsInLocal(events);
    yield put({ type: ACTION.CREATE_EVENT_SUCCESS, data: events });
  } catch (err) {
    console.log(err);
    yield put({ type: ACTION.CREATE_EVENT_ERROR, error: err });
  }
}

export function* checkEvents() {
  yield put({ type: ACTION.CHECK_EVENTS_REQUEST });
  try {
    const data = yield getEventsFromLocal();
    const checkedEvents = yield setEventsBooleans(data);
    const alarmedEvents = yield getAlarmedEventsArr(checkedEvents);
    yield setEventsInLocal(checkedEvents);
    yield put({
      type: ACTION.CHECK_EVENTS_SUCCESS,
      data: { events: checkedEvents, alarmedEvents },
    });
  } catch (err) {
    yield put({ type: ACTION.CHECK_EVENTS_ERROR, error: err });
  }
}

export function* sortEvents() {
  yield put({ type: ACTION.SORT_EVENTS_REQUEST });
  try {
    const data = yield getEventsFromLocal();
    const sortedEventsArr = yield sortEventsArr(data);
    yield setEventsInLocal(sortedEventsArr);
    yield put({ type: ACTION.SORT_EVENTS_SUCCESS, data: sortedEventsArr });
  } catch (err) {
    yield put({ type: ACTION.SORT_EVENTS_ERROR, error: err });
  }
}

export function* clearEvents() {
  yield put({ type: ACTION.CLEAR_EVENTS_REQUEST });
  try {
    yield put({ type: ACTION.CLEAR_EVENTS_SUCCESS });
  } catch (err) {
    yield put({ type: ACTION.CLEAR_EVENTS_ERROR, error: err });
  }
}
