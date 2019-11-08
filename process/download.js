const download = require('download-git-repo');

const { exec } = require('child_process');

let param = process.argv[2] ? process.argv[2] : 'vue';


download(`github:WanOuChang/${param}-demo`, 'test', (error) => {
    if (error) throw error;
    process.chdir(`./test/${param}-demo`)
    exec('npm install');
    console.log('成功')
})