import * as Router from 'koa-router'
import SocketManage from './socket'

const createRouter = (wss: SocketManage) => {
    const router = new Router()
    router.post('/api/v1/pc/socket/:uid', (ctx) => {
        const { uid } = ctx.params
        wss.create({ uid })
        ctx.response.body = 'Create connection'
    })
    return router
}

export default createRouter