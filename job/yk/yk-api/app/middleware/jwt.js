const jwt = require('jsonwebtoken');

let whiteList = [
    "/api/login",
    '/api/registry',
]

module.exports = () => {
    return async(ctx, next) => {
        if (whiteList.includes(ctx.path)) {
            await next();
        } else {
            let token = ctx.request.header.token;
            if (!token) {
                ctx.body = {
                    code: 0,
                    msg: '没有权限',
                }
                return;
            }

            try {
                let info = jwt.verify(token, ctx.app.config.keys);
                await next();
            } catch (error) {
                ctx.body = {
                    code: 0,
                    msg: '登录已过期'
                }
            }
        }
    }
}