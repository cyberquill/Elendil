import axios from 'axios';
import {
    COURSES_FETCHED,
    COURSES_SUGGESTED,
    COURSE_FETCHED,
    COURSE_SELECTED,
    GET_ERRORS,
} from './types';

export const createCourse = (newCourse, history) => dispatch => {
    axios
        .post('/api/courses/create', newCourse)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getCourses = uid => dispatch => {
    axios
        .get(`/api/courses/createdby/${uid}`)
        .then(res =>
            dispatch({
                type: COURSES_FETCHED,
                payload: res.data,
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getSuggestedCourses = uid => dispatch => {
    axios
        .get(`/api/courses/suggested/${uid}`)
        .then(res => 
            dispatch({
                type: COURSES_SUGGESTED,
                payload: res.data,
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getCourse = cid => dispatch => {
    axios
        .get(`/api/courses/${cid}`)
        .then(res =>
            dispatch({
                type: COURSE_FETCHED,
                payload: res.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const selectCourse = (index, area, history) => dispatch => {
    dispatch({
        type: COURSE_SELECTED,
        payload: index,
        area
    });
    history.push('/dashboard/course');
};
