import * as io from 'socket.io-client'
let socket = io.connect('ws://localhost:3001', {
    reconnectionAttempts: 10,
    query: {}
})
const createSocket = () => {
    socket.on('connect', function () {
        console.log('connect')
        socket.on('message', (msg: any) => {
            console.log(msg)
        });
    });
}
export default { createSocket, socket }