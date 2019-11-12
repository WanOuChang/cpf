const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const path = require('path');
const query = require('./controller/query.js');

app.use(static(path.join(process.cwd(), 'public')));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// 添加
router.post('/api/add', async ctx => {
    let create_time = new Date();
    let { username, password, sex, age, idCard, address, phone } = ctx.request.body;
    // 容错处理
    if (username && password && idCard) {
        // 查询此人是否存在
        let data = await query('SELECT * from userlist WHERE idCard=?', [idCard])
        if (!data.length) {
            ctx.body = {
                code: 3,
                msg: '此人已存在'
            }
        } else {
            try {
                await query('insert into userlist (username, password, sex, age, idCard, address, phone, create_time) values (?,?,?,?,?,?,?,?)', [username, password, sex, age, idCard, address, phone, create_time])
                ctx.body = {
                    code: 1,
                    msg: '添加成功',
                }
            } catch (error) {
                ctx.body = {
                    code: 0,
                    msg: error.error
                }
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: '缺失参数'
        }
    }
})

// 查询
router.get('/api/getList', async ctx => {
    try {
        let data = await query('select * from userlist');
        ctx.body = {
            code: 1,
            msg: 'success',
            data: data.data
        }
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error.error
        }
    }
})

// 删除
router.get('/api/del', async ctx => {
    let { id } = ctx.query;
    if (id || id === 0) {
        try {
            await query('delete from userlist where id=?', [id]);
            ctx.body = {
                code: 1,
                msg: '删除成功'
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.error
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: '缺失参数'
        }
    }
})

// 修改
router.post('/api/edit', async ctx => {
    let create_time = new Date();
    let { username, password, sex, age, idCard, address, phone, id } = ctx.request.body;
    // 容错处理
    if (username && password && idCard && id) {
        try {
            let data = await query('update userlist set username=?,password=?,sex=?,age=?,idCard=?,address=?,phone=?,create_time=? where id=?', [username, password, sex, age, idCard, address, phone, create_time, id])
            ctx.body = {
                code: 1,
                msg: '修改成功'
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.error
            }
        }

    } else {
        ctx.body = {
            code: 2,
            msg: '缺失参数'
        }
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功')
})