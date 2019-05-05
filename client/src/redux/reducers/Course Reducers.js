import {
    COURSES_FETCHED,
    COURSE_FETCHED,
    COURSE_SELECTED,
    COURSES_SUGGESTED,
} from '../actions/types';

const initialState = {
    activeCourse: {},
    list: [],
    suggested: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case COURSES_FETCHED:
            return {
                ...state,
                list: action.payload,
            };

        case COURSES_SUGGESTED:
            return {
                ...state,
                suggested: action.payload,
            };

        case COURSE_FETCHED:
            return {
                ...state,
                activeCourse: action.payload,
            };

        case COURSE_SELECTED:
            if(action.area === "list")
                state.activeCourse = state.list[action.payload];
            else
                state.activeCourse = state.suggested[action.payload];

            return state;

        default:
            return state;
    }
}
