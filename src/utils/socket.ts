import * as io from 'socket.io-client'
const createSocket = () => {
    const socket = io.connect('ws://localhost:3001', {
        reconnectionAttempts: 10,
        query: {
        }
    })
    socket.on('connect', function () {
        console.log('connect')
        socket.on('message', (msg: any) => {
            console.log(msg)
        });
    });
}
export default createSocket