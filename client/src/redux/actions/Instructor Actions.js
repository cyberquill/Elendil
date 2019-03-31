import { SET_INSTRUCTOR } from './types';
import axios from 'axios';

export const getCreateInstructor = uid => dispatch => {
    axios.get(`/api/instructors/${uid}`)
    .then(res => 
        dispatch({
            type: SET_INSTRUCTOR,
            payload: res.data,
        }))
    .catch(err => 
        axios.post('/api/instructors/create')
        .then(res => dispatch({
            type: SET_INSTRUCTOR,
            payload: res.data,
        }))) 
};
