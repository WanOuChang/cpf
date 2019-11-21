'use strict';

const Controller = require('egg').Controller;
// const createRule = {
//     title: 'string',
//     author: 'string',
//     significance: 'number',
//     pageview: 'number',
//     status: 'string'
// };

class ListController extends Controller {
    // 添加
    async add() {
        let { ctx, service } = this;
        let create_time = new Date();
        let { title, author, significance, pageview, status } = ctx.request.body;
        // ctx.validate(createRule)
        try {
            await service.list.add({ create_time, title, author, significance, pageview, status })
            ctx.body = {
                code: 1,
                msg: '添加成功'
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
        }
    }

    // 修改
    async edit() {
        let { ctx, service } = this;
        let create_time = new Date();
        let { title, author, significance, pageview, status, id } = ctx.request.body;
        try {
            await service.list.edit({ create_time, title, author, significance, pageview, status, id })
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

    // 删除
    async del() {
        let { ctx, service } = this;
        let { id } = ctx.query;
        // ctx.validate(createRule)
        try {
            await service.list.del(id);
            ctx.body = {
                code: 1,
                msg: '删除成功'
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    }

    // 查询
    async list() {
        let { ctx, service } = this;
        let { limit = 5, pagenum = 1 } = ctx.query;
        let startIndex = (pagenum - 1) * limit;
        try {
            let data = await service.list.list(limit, startIndex);
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

module.exports = ListController;