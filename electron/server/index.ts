import * as Koa from 'koa'
import createRouter from './router'
import SocketManage from './socket'
import * as http from 'http'
// import getIPAdress from './utils/ip'

// const ips = getIPAdress()

const createSocketServer = () => {
	const app = new Koa()
	const server = http.createServer(app.callback())
	const wss = new SocketManage(server)
	app.use(createRouter(wss).routes())
	app.listen(3005)
	console.log('app started at port 3005...');
	// wsServer.on('connect', function (socket) {
	// 	console.log('connectconnect')
	// 	socket.send(JSON.stringify(ips.map(item => ({ ...item, ws: `ws://${item.ip}:${port}` }))))
	// })
}
export default createSocketServer

