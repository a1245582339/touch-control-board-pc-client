import { w3cwebsocket as Ws } from 'websocket'
const client = new Ws('ws://localhost:3005')
export default client