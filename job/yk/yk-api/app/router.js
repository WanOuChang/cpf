'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    // 3./add, /delete, /edit, /list
    // 添加 
    router.post('/api/add', controller.list.add);
    // 修改
    router.post('/api/edit', controller.list.edit);
    // 删除
    router.get('/api/delete', controller.list.del);
    // 查询
    router.get('/api/list', controller.list.list);
};