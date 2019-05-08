import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';

const authTokenPresent = () => {
    if (localStorage.jwtToken) {
        const decoded = jwt_decode(localStorage.jwtToken);
        if (Date.now()/1000 < decoded.exp) {
            setAuthToken(localStorage.jwtToken);
            return decoded;
        }
    }
    return false;
};

export default authTokenPresent;
