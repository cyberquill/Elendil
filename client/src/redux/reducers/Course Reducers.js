import {
    COURSES_FETCHED,
    COURSE_FETCHED,
    COURSE_SELECTED,
} from '../actions/types';

const initialState = {
    activeCourse: {},
    list: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case COURSES_FETCHED:
            return {
                ...state,
                list: action.payload,
            };

        case COURSE_FETCHED:
            return {
                ...state,
                activeCourse: action.payload,
            };

        case COURSE_SELECTED:
            return {
                ...state,
                activeCourse: state.list[action.payload],
            };

        default:
            return state;
    }
}
