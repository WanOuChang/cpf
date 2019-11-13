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
    let { pagenum = 1, limit = 2 } = ctx.query;
    let startIndex = (pagenum - 1) * limit;
    let totalData = await query('select count(*) from banner_list')
    try {
        let data = await query(`select * from banner_list limit ${startIndex},${limit}`)
        ctx.body = {
            code: 1,
            msg: 'success',
            data,
            total: totalData[0]["count(*)"],
        }
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error
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
                msg: error
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
    let create_time = new Date();
    let { serial_num, remarks, types, sort } = ctx.request.body;
    if (remarks && types && serial_num) {
        let data = await query('select * from banner_list where serial_num=?', [serial_num]);
        console.log(data)
        if (data.length) {
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
                    msg: error
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
router.post('/api/edit', async ctx => {
    let create_time = new Date();
    let { serial_num, remarks, types, sort, id } = ctx.request.body;
    if (remarks && types && serial_num && id) {
        try {
            await query('update banner_list set serial_num=?, remarks=?, types=?, sort=?, create_time=? where id=?', [serial_num, remarks, types, sort, create_time, id])
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
            msg: '缺失参数'
        }
    }
})


app.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功')
})