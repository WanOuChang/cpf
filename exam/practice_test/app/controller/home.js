'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')

class HomeController extends Controller {
    async index() {
        let { ctx } = this;
        ctx.body = 'hi, egg';
    }

    async menu() {
        let { ctx, service } = this;
        let { token } = ctx.request.header
        let { role_id } = jwt.verify(token, ctx.app.config.keys);
        try {
            let data = await service.home.menu(role_id);
            ctx.body = {
                code: 1,
                msg: 'success',
                data,
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
        }


    }
}

module.exports = HomeController;