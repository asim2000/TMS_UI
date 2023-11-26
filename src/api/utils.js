import alertify from "alertifyjs"
import axios from "axios"
import { getJwt } from "../utilities/jwt/jwt"

const instance = axios.create({
    baseURL: 'http://localhost:8085/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})


export const makeRequest = (type, path, body) => {
    return instance[type](path, JSON.stringify(body))
}



instance.interceptors.response.use(response => {
    if (response.data.code >=200 && response.data.code<300) {
        return response.data
    } else {
        return Promise.reject({ code: response.data.code, message: response.data.message })
    }
}, error => {
    console.log(error)
    if (error.code === 'ERR_NETWORK') {
        if (getJwt() == null) {
            window.location.href = '/login'
        } else {
            //window.location.href = '/notfound'
        }
    }
    return Promise.reject({ code: error.code, message: error.message })
})

instance.interceptors.request.use(request => {
    if (getJwt() != null) {
        request.headers.Authorization = `Bearer ${getJwt()}`
    }
    return request
})
