import { ANSWERS_FETCHED } from '../actions/types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    qid: null,
    list: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ANSWERS_FETCHED:
            return {
                ...state,
                qid: action.qid,
                list: action.payload
            }

        default:
            return state;
    }
}
