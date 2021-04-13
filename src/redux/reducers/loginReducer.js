// *
import { USER_LOGIN } from '../actions/index';

const INITIAL_STATE_LOGIN = {
  name: '',
  email: '',
  gravatar: '',
};

const loginReducer = (state = INITIAL_STATE_LOGIN, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state,
      name: action.name,
      email: action.email,
      gravatar: action.gravatar };

  default:
    return state;
  }
};

export default loginReducer;
