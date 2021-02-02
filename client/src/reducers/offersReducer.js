import ACTION from '../actions/actionTypes';

const initialState = {
  offers: [],
  isFetching: true,
  error: null,
  haveMore: true,
  settings: {
    limit: 10,
    offset: 0,
    order: 'asc',
  },
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
        settings: {
          ...state.settings,
          offset: action.data.offset,
        },
      };
    }
    case ACTION.MODERATOR_UPDATE_OFFER_SUCCESS: {
      return {
        ...state,
        error: null,
        isFetching: false,
        offers: action.data.offers,
        settings: action.data.settings,
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
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.CLEAR_OFFERS_STORE: {
      return initialState;
    }
    default:
      return state;
  }
}
