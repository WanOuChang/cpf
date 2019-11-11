const Koa = require('koa');

const app = new Koa();

app.use(async(ctx, next) => {
    let startTime = new Date().getTime(); // 开始执行时间
    console.log('洋葱圈模型第一层开始'); // 1 --- end
    await next();
    console.log('洋葱圈模型第一层结束');
    let endTime = new Date().getTime(); // 执行结束时间
    let timer = endTime - startTime;
    ctx.body = timer;
})


function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })

}
app.use(async(ctx, next) => {
    console.log('洋葱圈模型第二层开始');
    await delay();
    await next();
    console.log('洋葱圈模型第二层结束');
})


app.use(async(ctx, next) => {
    console.log('洋葱圈模型第三层开始');
    await next();
    console.log('洋葱圈模型第三层结束');
})



app.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功');
})