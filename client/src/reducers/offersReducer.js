import ACTION from '../actions/actionTypes';

const initialState = {
  offers: [],
  isFetching: false,
  error: null,
  haveMore: true,
  settings: {
    limit: 10,
    offset: 0,
    order: 'asc',
    counter: 0,
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
        error: null,
      };
    }
    case ACTION.GET_OFFERS_SUCCESS: {
      const newOffset =
        state.settings.offset + state.settings.limit - state.settings.counter;
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: action.data.offers,
        haveMore: action.data.haveMore,
        settings: {
          ...state.settings,
          offset: newOffset,
        },
      };
    }
    case ACTION.MODERATOR_UPDATE_OFFER_SUCCESS: {
      return {
        ...state,
        error: null,
        offers: action.data.offers,
        settings: {
          ...state.settings,
          counter: state.settings.counter++,
        },
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
    case ACTION.CLEAR_OFFERS_STORE: {
      return initialState;
    }
    default:
      return state;
  }
}
