import ACTION from '../actions/actionTypes';

const initialState = {
  offers: [],
  isFetching: false,
  error: null,
  haveMore: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_OFFERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.MODERATOR_UPDATE_OFFER_REQUEST: {
      return {
        ...state,
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
    case ACTION.MODERATOR_UPDATE_OFFER_SUCCESS: {
      return {
        ...state,
        error: null,
        offers: action.data.offers,
      };
    }
    case ACTION.GET_OFFERS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.MODERATOR_UPDATE_OFFER_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
