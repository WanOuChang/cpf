'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserController extends Controller {

    // 登录
    async login() {
        let { ctx, service } = this;
        let { username, password } = ctx.request.body;
        let data = await service.user.login(username, password);
        // console.log(data)
        if (data.length) {

            let token = jwt.sign({ username, password, role_id: data[0].role_id }, this.app.config.keys, { expiresIn: 60 });
            // ctx.cookies.set('token', token);
            ctx.body = {
                code: 1,
                msg: '登录成功',
                token,
                roleName: data[0].rolename,
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '登录失败'
            }
        }


    }

    //




}

module.exports = UserController;