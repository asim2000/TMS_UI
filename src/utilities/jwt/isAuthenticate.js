import { jwtDecode } from 'jwt-decode';
import { getJwt } from '../../utilities/jwt/jwt';

export const isAuthenticated = ()=> {
    const token = getJwt()
    if(token !==null){
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert current date to UNIX timestamp
        return !(decodedToken.exp < currentTime)
    }
    return false;
    }