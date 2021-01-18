import ACTION from '../actions/actionTypes';

const initialState = {
  events: [],
  alarmedEvents: [],
  isFetching: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_EVENTS_REQUEST:
    case ACTION.CREATE_EVENT_REQUEST:
    case ACTION.CHECK_EVENTS_REQUEST:
    case ACTION.SORT_EVENTS_REQUEST:
    case ACTION.CLEAR_EVENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
      break;
    case ACTION.GET_EVENTS_SUCCESS:
    case ACTION.CREATE_EVENT_SUCCESS:
    case ACTION.SORT_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        events: action.data,
      };
      break;
    case ACTION.CHECK_EVENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        events: action.data.events,
        alarmedEvents: action.data.alarmedEvents,
      };
    }
    case ACTION.CLEAR_EVENTS_SUCCESS: {
      return initialState;
    }
    case ACTION.GET_EVENTS_ERROR:
    case ACTION.CREATE_EVENT_ERROR:
    case ACTION.CHECK_EVENTS_ERROR:
    case ACTION.SORT_EVENTS_ERROR:
    case ACTION.CLEAR_EVENTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
      break;
    case ACTION.EVENT_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
