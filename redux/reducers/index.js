import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth_status: userReducer,
});

export default rootReducer;
