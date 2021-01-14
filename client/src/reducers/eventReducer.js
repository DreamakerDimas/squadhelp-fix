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
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ACTION.GET_EVENTS_SUCCESS:
    case ACTION.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        events: action.data,
      };
    case ACTION.GET_EVENTS_ERROR:
    case ACTION.CREATE_EVENT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ACTION.CHECK_EVENTS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        alarmedEvents: action.data,
      };
    }
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
