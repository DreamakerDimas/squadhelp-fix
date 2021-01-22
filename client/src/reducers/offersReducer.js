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
      const newOffset = state.settings.offset - state.settings.counter;
      return {
        ...state,
        isFetching: true,
        error: null,
        settings: {
          ...state.settings,
          offset: newOffset,
        },
      };
    }
    case ACTION.MODERATOR_UPDATE_OFFER_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case ACTION.GET_OFFERS_SUCCESS: {
      const newOffset = state.settings.offset + state.settings.limit;
      const prevOffers = state.offers;
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: [...prevOffers, ...action.data.offers],
        haveMore: action.data.haveMore,
        settings: {
          ...state.settings,
          offset: newOffset,
        },
      };
    }
    case ACTION.MODERATOR_UPDATE_OFFER_SUCCESS: {
      const id = action.data.id;
      const isAccepted = action.data.isAccepted;
      const newOffers = state.offers.map((offer) =>
        offer.id === id ? { ...offer, isAccepted } : offer
      );
      return {
        ...state,
        error: null,
        settings: {
          ...state.settings,
          counter: state.settings.counter + 1,
        },
        offers: newOffers,
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
