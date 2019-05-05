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

        /* case ANSWERS_FETCHED:
            if(isEmpty(action.payload))
                return state;
            const qid = action.payload[0].qid;
            const cluster = {qid, answers: action.payload};
            const newState = state.filter(s => (s.qid !== qid));
            newState.push(cluster);
            return newState; */

        default:
            return state;
    }
}
