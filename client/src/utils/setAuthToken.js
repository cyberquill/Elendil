
import axios from 'axios';

const setAuthToken = (token) => {
    if(token)
        //apply token every request's header
        axios.defaults.headers.common['Authorization'] = token;
    else
        //delete the auth. field from header
        delete axios.defaults.headers.common['Authorization'];
}

export default setAuthToken;