import ACTION from '../actions/actionTypes';

const initialState = {
  offers: [],
  isFetching: false,
  error: null,
  haveMore: true,
};

// get-> offset: offset + limit

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_OFFERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_OFFERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: action.data.offers,
        haveMore: action.data.haveMore,
      };
    }
    case ACTION.GET_OFFERS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
