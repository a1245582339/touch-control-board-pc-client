import http from './config'
export const createSocket = (uid: string) => {
    return http.post(`/socket/${uid}`)
}