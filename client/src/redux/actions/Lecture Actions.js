import axios from 'axios';
import {
    LECTURES_FETCHED,
    LECTURE_FETCHED,
    LECTURE_SELECTED,
    GET_ERRORS,
} from './types';
import { resetDeletion } from './Delete Actions';

export const createLecture = (newLecture, history) => dispatch => {
    axios
        .post('/api/lectures/create', newLecture)
        .then(res => history.push('/dashboard/course/lectures'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getLectures = cid => dispatch => {
    axios
        .get(`/api/lectures/of/${cid}`)
        .then(res =>
            dispatch({
                type: LECTURES_FETCHED,
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

export const getLecture = lid => dispatch => {
    axios
        .get(`/api/courses/single/${lid}`)
        .then(res =>
            dispatch({
                type: LECTURE_FETCHED,
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

export const selectLecture = index => dispatch => {
    dispatch({
        type: LECTURE_SELECTED,
        payload: index,
    });
};

export const deleteLecture = lid => dispatch => {
    axios
        .delete(`/api/lectures/${lid}`)
        .then(res => {
            resetDeletion();
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};
