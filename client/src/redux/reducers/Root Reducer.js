import { combineReducers } from 'redux';
import authReducers from './Auth Reducers';
import errorReducers from './Error Reducers';

export default combineReducers({
    auth: authReducers,
    errors: errorReducers
});