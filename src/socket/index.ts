import * as io from 'socket.io-client'
let socket = io.connect('ws://localhost:3005', {
    reconnectionAttempts: 10,
    query: {}
})
export default socket