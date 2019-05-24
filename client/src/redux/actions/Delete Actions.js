import { DELETE_TRIGGERED, DELETE_APPROVED, DELETE_RESET } from './types';

export const triggerDeletion = () => dispatch =>
    dispatch({type: DELETE_TRIGGERED});

export const approveDeletion = () => dispatch =>
    dispatch({type: DELETE_APPROVED});

export const resetDeletion = () => dispatch =>
    dispatch({type: DELETE_RESET});
