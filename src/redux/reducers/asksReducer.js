import { CREATE_ASKS } from '../actions/index';

const INITIAL_STATE_ASKS = {
  asks: [],
};

const asksReducer = (state = INITIAL_STATE_ASKS, action) => {
  switch (action.type) {
  case CREATE_ASKS:

    return { asks: [...action.asks] };

  default:
    return state;
  }
};

export default asksReducer;
