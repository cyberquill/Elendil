import { combineReducers } from 'redux';
import authReducers from './Auth Reducers';
import errorReducers from './Error Reducers';
import courseReducers from './Course Reducers';
import lectureReducers from './Lecture Reducers';

export default combineReducers({
    auth: authReducers,
    courses: courseReducers,
    lectures: lectureReducers,
    errors: errorReducers
});