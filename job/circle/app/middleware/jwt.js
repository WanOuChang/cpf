const jwt = require('jsonwebtoken');
const whiteList = [
    '/api/registry',
    '/api/login',
    '/api/getList'
]

module.exports = () => {
    return async(ctx, next) => {
        if (whiteList.includes(ctx.path)) {
            await next();
        } else {
            let token = ctx.request.headers.authorization;
            if (!token) {
                ctx.body = {
                    code: 2,
                    msg: '没有权限'
                }
                return;
            }

            try {
                let userInfo = jwt.verify(token, ctx.app.config.keys)
                await next();
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    ctx.body = {
                        code: 0,
                        mes: '登录过期，请重新登录'
                    }
                }
            }
        }
    }
}