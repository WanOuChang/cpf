'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')


class UserController extends Controller {

    // 注册
    async registry() {
        let age = null
        let { ctx, service } = this;
        let { username, password } = ctx.request.body;
        let errors = await this.app.validator.validate({ username: 'string', password: 'password' }, ctx.request.body);
        if (errors) {
            ctx.body = {
                code: 3,
                msg: errors
            }
            return;
        }

        try {
            let hmasPwd = ctx.helper.hmas(password)
            let result = await service.user.find(username);
            if (result.length) {
                ctx.body = {
                    code: 2,
                    msg: '此用户已存在'
                }
            } else {
                try {
                    await service.user.registry({ username, hmasPwd, age })
                    ctx.body = {
                        code: 1,
                        msg: '注册成功',
                    }
                } catch (error) {
                    ctx.body = {
                        code: 0,
                        msg: error
                    }
                }
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
        }


    }

    // 登录
    async login() {
        let { ctx, service } = this;
        let { username, password } = ctx.request.body;
        let hmasPwd = ctx.helper.hmas(password)
            // console.log(result)
        try {
            ctx.validate(createRule);
            let result = await service.user.login({ username, hmasPwd });
            let userInfo = {
                ...result[0]
            }
            let token = jwt.sign(userInfo, this.app.config.keys, { expiresIn: 120 });
            if (result.length) {
                ctx.body = {
                    code: 1,
                    msg: '登录成功',
                    token,
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: '用户名或密码错误'
                }
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
        }
    }

    // 注销
    async del() {
        let { ctx, service } = this;
        let { id } = ctx.query;
        let result = await service.user.del(id);
        console.log(result)
        if (id || id === 0) {
            try {
                await service.user.del(id);
                ctx.body = {
                    code: 1,
                    msg: '注销成功'
                }
            } catch (error) {
                ctx.body = {
                    code: 0,
                    msg: error
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '缺失参数'
            }
        }
    }

    // 修改密码
    async editPassword() {
        let { ctx, service } = this;
        let { id, password, newpassword } = ctx.request.body;
        let result = await service.user.pwdSome({ id, password });
        if (result.length) {
            try {
                await service.user.edit({ id, newpassword });
                ctx.body = {
                    code: 1,
                    msg: '修改成功'
                }
            } catch (error) {
                ctx.body = {
                    code: 0,
                    msg: error
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg: '两次密码不一致'
            }
        }
    }

    // 编辑用户信息
    async editInfo() {
        let { ctx, service } = this;
        let { id, username, age } = ctx.request.body;
        if (!username || !id) {
            ctx.body = {
                code: 0,
                msg: '缺失参数'
            }
        }
        try {
            await service.user.editInfo(id, username, age)
            ctx.body = {
                code: 1,
                msg: '修改成功'
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
        }
    }








}

module.exports = UserController;