import http from '../http'

export function getComments() {
    return http.get('Comment/Get')
}

export function sendComment(data) {
    return http.post('Comment/Add', data)
}