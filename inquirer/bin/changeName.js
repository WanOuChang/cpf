#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

let oldname = process.argv[2] && process.argv[2].slice(1);
let newname = process.argv[3] && process.argv[2].slice(1);

if (fs.existsSync(path.join(process.cwd(), oldname))) {
    fs.renameSync(oldname, newname);
}

let i = 0;
let list = fs.readdirSync(process.cwd());
list.forEach(item => {
    if (/.js%/.test(item)) {
        i++;
        fs.renameSync(item, `index(${i}).js`)
    }
})