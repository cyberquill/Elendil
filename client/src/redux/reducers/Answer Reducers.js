import { ANSWERS_FETCHED } from '../actions/types';

const initialState = {
    list: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ANSWERS_FETCHED:
            return {
                ...state,
                list: action.payload,
            };

        default:
            return state;
    }
}
