import {
    COURSES_FETCHED,
    COURSE_FETCHED,
    COURSE_SELECTED,
    COURSES_FETCHED_ALL,
} from '../actions/types';

const initialState = {
    activeCourse: {},
    list: [],
    all: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case COURSES_FETCHED:
            return {
                ...state,
                list: action.payload,
            };

        case COURSES_FETCHED_ALL:
            return {
                ...state,
                all: action.payload,
            };

        case COURSE_FETCHED:
            return {
                ...state,
                activeCourse: action.payload,
            };

        case COURSE_SELECTED:
            if(action.area == "list")
                state.activeCourse = state.list[action.payload];
            else
                state.activeCourse = state.all[action.payload];

            return state;

        default:
            return state;
    }
}
