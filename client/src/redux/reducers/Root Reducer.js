import { combineReducers } from 'redux';
import authReducers from './Auth Reducers';
import errorReducers from './Error Reducers';
import courseReducers from './Course Reducers';
import lectureReducers from './Lecture Reducers';
import instructorReducer from './Instructor Reducer';

export default combineReducers({
    auth: authReducers,
    instructor: instructorReducer,
    courses: courseReducers,
    lectures: lectureReducers,
    errors: errorReducers
});