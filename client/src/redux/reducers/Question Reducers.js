import {
    QUESTIONS_FETCHED,
    QUESTION_SELECTED,
} from '../actions/types';

const initialState = {
    activeQuestion: {},
    list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case QUESTIONS_FETCHED:
            return {
                ...state,
                list: action.payload,
            };

        case QUESTION_SELECTED:
            return {
                ...state,
                activeQuestion: list[action.payload],
            };

        default:
            return state;
    }
}
