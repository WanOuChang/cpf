const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const query = require('./db/index');

app.use(static(path.join(process.cwd(), 'public')));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());



// 添加地址
router.post('/api/add', async ctx => {
    let { linkman, phone, address, detAddress } = ctx.request.body;
    if (linkman && phone && address && detAddress) {
        try {
            await query('insert into addresslist (linkman, phone, address, detAddress) values (?,?,?,?)', [linkman, phone, address, detAddress])
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
    } else {
        ctx.body = {
            code: 2,
            msg: '缺失参数'
        }
    }
})

// 删除地址
router.get('/api/del', async ctx => {
    let { id } = ctx.query;
    if (id || id === 0) {
        try {
            await query('delete from addresslist where id=?', [id])
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

// 查询
router.get('/api/getList', async ctx => {
    try {
        let data = await query('select * from addresslist')
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
})

// 修改地址
router.post('/api/edit', async ctx => {
    let { id, linkman, phone, address, detAddress } = ctx.request.body;

    if (id && linkman && phone && address && detAddress) {
        let data = await query('select * from addresslist where id=?', [id]);
        // console.log(data)
        if (data.length) {
            try {
                await query('update addresslist set linkman=?,phone=?,address=?,detAddress=? where id=?', [linkman, phone, address, detAddress, id])
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
                code: 3,
                msg: '修改失败'
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