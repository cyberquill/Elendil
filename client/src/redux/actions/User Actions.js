import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

export const createUser = (newUser, history) => dispatch => {
    axios
        .post('/api/users/signup', newUser)
        .then(res => {
            const { password2, ...user } = newUser;
            dispatch(setCurrentUser(user));
            history.push('/dashboard');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const loginUser = (user, history) => dispatch => {
    axios
        .post('/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            history.push('/dashboard');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};
