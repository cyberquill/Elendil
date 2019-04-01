import axios from 'axios';
import {
    COURSES_FETCHED,
    COURSE_FETCHED,
    COURSE_SELECTED,
    GET_ERRORS,
    COURSES_FETCHED_ALL,
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
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getAllCourses = () => dispatch => {
    axios
        .get('/api/courses/all')
        .then(res =>
            dispatch({
                type: COURSES_FETCHED_ALL,
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

export const getCourse = cid => dispatch => {
    axios
        .get(`/api/courses/single/${cid}`)
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
