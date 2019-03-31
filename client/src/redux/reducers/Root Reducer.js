import { combineReducers } from 'redux';
import authReducers from './Auth Reducers';
import errorReducers from './Error Reducers';
import courseReducers from './Course Reducers';
import lectureReducers from './Lecture Reducers';
import instructorReducer from './Instructor Reducer';
import questionReducer from './Question Reducers';
import answerReducer from './Answer Reducers';

export default combineReducers({
    auth: authReducers,
    instructor: instructorReducer,
    courses: courseReducers,
    lectures: lectureReducers,
    questions: questionReducer,
    answers: answerReducer,
    errors: errorReducers
});