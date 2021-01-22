import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ACTION from '../actions/actionTypes';
import authReducer from './authReducer';
import getUserReducer from './userReducer';
import dataForContestReducer from './dataForContestReducer';
import payReducer from './payReducer';
import getContestsReducer from './getContestsReducer';
import storeContestReducer from './storeContestReducer';
import bundleReducer from './bundleReducer';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';
import eventReducer from './eventReducer';
import offersReducer from './offersReducer';

const appReducer = combineReducers({
  form: formReducer,
  userStore: getUserReducer,
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: payReducer,
  contestByIdStore: getContestByIdReducer,
  contestsList: getContestsReducer,
  contestStore: storeContestReducer,
  bundleStore: bundleReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
  eventsStore: eventReducer,
  offersStore: offersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTION.CLEAR_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
