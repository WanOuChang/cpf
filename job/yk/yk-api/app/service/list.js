'use strict';

const Service = require('egg').Service;

class ListService extends Service {
    // 添加
    async add({ create_time, title, author, significance, pageview, status }) {
        return await this.app.mysql.query('insert into yklist (create_time,title, author, significance, pageview, status) values (?,?,?,?,?,?)', [create_time, title, author, significance, pageview, status])
    }

    // 修改
    async edit({ create_time, title, author, significance, pageview, status, id }) {
        return await this.app.mysql.query('update yklist set create_time=?, title=?, author=?, significance=?, pageview=?, status=? where id=?', [create_time, title, author, significance, pageview, status, id])
    }

    // 删除
    async del(id) {
        return await this.app.mysql.query('delete from yklist where id=?', [id]);
    }

    // 查询
    async list(limit, startIndex) {
        return await this.app.mysql.query(`select * from yklist limit ${startIndex},${limit}`)
    }
}

module.exports = ListService;