#! /usr/bin/env node

// 引入 fs 内置模块
let fs = require('fs');
// 引入 path 内置模块
let path = require('path');

// 截取命令行 文件名
let dist = process.argv[2].slice(1);

// 目标文件夹路径
const url = path.join(process.cwd(), dist);

// 判断路径是否存在
if (fs.existsSync(url)) {
    // 判断是文件还是文件夹
    if (fs.statSync(url).isDirectory()) {
        // 读取文件  返回数组
        let dirList = fs.readdirSync(url);

        let targetList = dirList.map(item => {
            // 截取后缀名
            let extname = path.extname(item) ? path.extname(item) : ".文件夹";
            // console.log(extname)
            // 判断文件/文件夹大小
            let size = fs.statSync(path.join(dist, item)).size;
            // 拼接
            console.log(`${item}--${extname.slice(1)}--${size}`)
            return `${item}--${extname.slice(1)}--${size}`;
        })
        console.log(targetList)
    } else {
        console.log(dist);
    }
} else {
    console.log('此目录不存在');
}