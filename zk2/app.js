#! /usr/bin/env node

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, process.argv[2])
let childProcess = createWorker();


function createWorker() {
    // 容错处理，判断路径是否存在
    console.log(fs.existsSync(filePath))
    if (fs.existsSync(filePath)) {
        // 创建子进程
        console.log(12)
        let child = child_process.spawn('node', [filePath]);
        child.stdout.on('data', data => {
            console.log(data.toString())
        })

        child.stderr.on('data', error => {
            console.log(error)
        })
        return child
    } else {
        console.log("当前路径不存在")
    }

}

// 监听
let watcher = fs.watch(filePath);

watcher.on('change', () => {
    console.log(1)
        // 杀掉子进程
    childProcess.kill();
    // 创建子进程
    childProcess = createWorker();
})