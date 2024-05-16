import http from '../http'

export function Login(data) {
    return http.post('User/Login', data)
}

export function Register(data) {
    return http.post('User/Register', data)
}