// 引入创建服务内置模块
const http = require('http');
// 引入创建子进程内置模块
const child_process = require('child_process');
// 获取CPU数量
let cpuLen = require('os').cpus().length;
// 创建服务
let server = http.createServer();
// 监听端口号
server.listen(3000);
// 子进程集
let workers = {};


// 封装创建子进程方法
function createWorker() {
    // 创建子进程
    let worker = child_process.fork("./worker.js");
    workers[worker.pid] = worker;

    console.log(workers);
    // 将创建好的服务发送给子进程
    worker.send('server', server)
        // 接收子进程捕获的异常错误
    worker.on('message', ({ msg }) => {
        if (msg === 'error') {
            // 删除错误的子进程
            delete workers[worker.pid];
            // 重新创建子进程
            createWorker();
        }
    })

    // 子进程退出
    worker.on('exit', () => {
        // 杀掉子进程
        delete workers[worker.pid];
        // 重新创建子进程
        createWorker();
    })

}

// 循环创建子进程
for (let i = 0; i < cpuLen; i++) {
    createWorker()
}

// 主进程退出
process.on('exit', () => {
    for (let i in workers) {
        // 循环杀掉子进程
        workers[i].kill();
    }
})