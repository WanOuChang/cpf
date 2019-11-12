const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const query = require('./db/index')

app.use(static(path.join(process.cwd(), "public")));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// 查询
router.get('/api/getList', async ctx => {
    try {
        let data = await query('select * from banner_list')
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
            await query('delete from banner_list where id=?', [id]);
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

// 添加
router.post('/api/add', async ctx => {
    let { serial_num, remarks, types, sort, create_time } = ctx.request.body;
    if (remarks && types && serial_num) {
        let data = await query('select * from banner_list where serial_num=?', [serial_num]);
        if (data.data.length) {
            ctx.body = {
                code: 3,
                msg: '此用户已存在',
            }
        } else {
            try {
                await query('insert into banner_list (serial_num,remarks,types,sort,create_time) values (?,?,?,?,?)', [serial_num, remarks, types, sort, create_time])
                ctx.body = {
                    code: 1,
                    msg: '添加成功'
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

// 修改



app.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功')
})