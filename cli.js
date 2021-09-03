#!/usr/bin/env node
const { program } = require('commander')
const package = require('./package.json')
const downloadIconfont = require('./index.js')
const { pull } = require('./commands');
program
    .version(package.version)
// 拉取最新的包
program
    .command(pull.name)
    .option('-f, --filename [filename]', 'output filename')
    .option('-d, --dest [dir]', 'output dir')
    .description(pull.desc)
    .action(pull.action)

program
    .command('download <url>')
    .option('-f, --filename [filename]', 'output filename')
    .option('-d, --dest [dir]', 'output dir')
    .description('')
    .action((url, option) => {
        let params = {
            url: url
        }
        if (option.filename) {
            params.fileName = option.filename
        }
        if (option.dest) {
            params.dest = option.dest
        }
        downloadIconfont(params)
    })
program.parse(process.argv)