'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
    async menu(role_id) {
        return await this.app.mysql.query(`SELECT menuname,menuapi from menulist WHERE power like '%${role_id}%'`);
    }
}

module.exports = HomeService;