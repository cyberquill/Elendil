import { combineReducers } from 'redux';
import userReducers from './User Reducers';
import errorReducers from './Error Reducers';
import courseReducers from './Course Reducers';
import lectureReducers from './Lecture Reducers';
import questionReducers from './Question Reducers';
import answerReducers from './Answer Reducers';
import deleteReducers from './Delete Reducers';

export default combineReducers({
    user: userReducers,
    courses: courseReducers,
    errors: errorReducers,
    lectures: lectureReducers,
    questions: questionReducers,
    answers: answerReducers,
    deletion: deleteReducers
});