// 引入 koa 框架模块
const Koa = require('koa');
// 实例 app
const app = new Koa();
// 引入解析 post 请求中间件 
const bodyParser = require('koa-bodyparser');
// 引入静态资源处理中间件
const static = require('koa-static');
// 引入处理路由中间件
const router = require('koa-router')();
// 引入处理路径内置模块
const path = require('path');

const query = require("./controller/query")


// 使用 解析post请求中间件
app.use(bodyParser());

// 处理静态资源路径
app.use(static(path.join(process.cwd(), "public")));

// 处理路由
app.use(router.routes());
app.use(router.allowedMethods());

// 3. /put（新增）, /del（删除）, /update（修改）, /bookslist（列表）


// 添加
router.post("/api/put", async ctx => {
    console.log(ctx.request.body)
    let { create_time, title, author, significance, reading_num, status } = ctx.request.body;
    let data = await query(`insert into koalist (create_time,title,author,significance,reading_num,status) values (?,?,?,?,?,?)`, [create_time, title, author, significance, reading_num, status])
    console.log(data)
    if (data) {
        ctx.body = { code: 1, msg: data }
    } else {
        ctx.body = { code: 0, msg: '添加失败' }
    }
})

// 修改
router.post('/api/update', async ctx => {
    let { create_time, title, author, significance, reading_num, status, id } = ctx.request.body;
    let data = await query('UPDATE koalist set create_time=?,title=?,author=?,significance=?,reading_num=?,status=? where id=?', [create_time, title, author, significance, reading_num, status, id])
    if (data) {
        ctx.body = { code: 1, msg: data }
    } else {
        ctx.body = { code: 0, msg: '修改失败' }
    }
})

// 删除
router.get("/api/del", async ctx => {
    let { id } = ctx.query;
    let data = await query('DELETE FROM koalist WHERE id=?', [id])
    if (data) {
        ctx.body = { code: 1, msg: data }
    } else {
        ctx.body = { code: 0, msg: '删除失败' }
    }
})


// 启动监听服务
app.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功')
})