import { server as Ws } from 'websocket'
import * as http from 'http'
export default class SocketManage {
	_server: http.Server
	_wss: {}
	constructor(server: http.Server) {
		this._server = server
		this._wss = {}
	}
	create(opt: { uid: string }) {
		if (this._wss[opt.uid]) {
			console.log(`${opt.uid} Socket has already exist`)
			return false
		}
		this._wss[opt.uid] = new Ws({
			httpServer: this._server,
			autoAcceptConnections: false
		}).on('connect', connection => {
			console.log(`${opt.uid} connection`)
		})
	}
	get(uid: string) {
		return this._wss[uid]
	}
}