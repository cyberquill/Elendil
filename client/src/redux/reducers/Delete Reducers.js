import {
    DELETE_TRIGGERED,
    DELETE_APPROVED,
    DELETE_RESET,
} from '../actions/types';

const initialState = {
    trigger: 0,
    approval: null,
    id: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case DELETE_TRIGGERED:
            return {
                ...state,
                trigger: 1,
                approval: 0,
                id: action.id,
            };

        case DELETE_APPROVED:
            return {
                ...state,
                approval: 1,
            };

        case DELETE_RESET:
            return initialState;

        default:
            return state;
    }
}
