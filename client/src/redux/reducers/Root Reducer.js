import { combineReducers } from 'redux';
import userReducers from './User Reducers';
import errorReducers from './Error Reducers';

export default combineReducers({
    user: userReducers,
    errors: errorReducers
});