import axios from 'axios';
import {
    QUESTIONS_FETCHED,
    QUESTION_SELECTED,
    GET_ERRORS,
} from './types';

export const createQuestion = (newQuestion, history) => dispatch => {
    axios
        .post('/api/questions/create', newQuestion)
        .then(res => axios
            .get(`/api/questions/askedin/${newQuestion.cid}`)
            .then(res =>
                dispatch({
                    type: QUESTIONS_FETCHED,
                    payload: res.data,
                }),
            ))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getQuestions = cid => dispatch => {
    axios
        .get(`/api/questions/askedin/${cid}`)
        .then(res =>
            dispatch({
                type: QUESTIONS_FETCHED,
                payload: res.data,
            }),
        )
};

export const selectQuestion = index => dispatch => {
    dispatch({
        type: QUESTION_SELECTED,
        payload: index,
    });
};

export const deleteQuestion = qid => dispatch => {
    axios
        .delete(`/api/questions/${qid}`)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};