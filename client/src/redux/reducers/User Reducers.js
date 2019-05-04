
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            const user = action.payload;
            return {
                ...state,
                ...user
            }

        default:
            return state;
    }
}
