const jwt = require('jsonwebtoken');

const whiteList = [
    '/api/login',
]

module.exports = () => {
    return async(ctx, next) => {
        if (whiteList.includes(ctx.path)) {
            await next();
        } else {
            let { token } = ctx.request.header;
            if (!token) {
                ctx.body = {
                    code: 2,
                    msg: '没有权限',
                }
                return;
            }

            try {
                let userInfo = jwt.verify(token, ctx.app.config.keys);
                await next();
            } catch (error) {
                if (error == 'TokenExpiredError') {
                    ctx.body = {
                        code: 0,
                        msg: '登录过期请重新登录'
                    }
                }
            }
        }
    }
}