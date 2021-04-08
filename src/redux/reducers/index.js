import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import asksReducer from './asksReducer';

const rootReducer = combineReducers({
  loginReducer, asksReducer,
});

export default rootReducer;
