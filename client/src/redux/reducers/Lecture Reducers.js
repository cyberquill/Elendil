import {
    LECTURES_FETCHED,
    LECTURE_FETCHED,
    LECTURE_SELECTED,
} from '../actions/types';

const initialState = {
    activeLecture: {},
    list: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LECTURES_FETCHED:
            return {
                ...state,
                list: action.payload,
            };

        case LECTURE_FETCHED:
            return {
                ...state,
                activeLecture: action.payload,
            };

        case LECTURE_SELECTED:
            return {
                ...state,
                activeLecture: state.list[action.payload],
            };

        default:
            return state;
    }
}
