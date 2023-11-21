import axios from "axios"
import { makeRequest } from "../api/utils"

export default class AuthService {

 register = body => {
    return makeRequest('post','/auth/register', body)

}

 login = body => {
    return makeRequest('post', '/auth/login', body)
}
forgotPassword = body => {
    return makeRequest('post','/auth/forgotPassword',body)
}
}