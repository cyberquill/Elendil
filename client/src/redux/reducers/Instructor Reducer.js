import { SET_INSTRUCTOR } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_INSTRUCTOR:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
