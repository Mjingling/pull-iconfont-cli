/*
 * @Author: xinxian_mu
 * @Date: 2021-09-03 09:44:20
 * @LastEditTime: 2021-09-03 12:06:46
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/commands/pull/index.js
 */
const cdn = require('../../apis/cdn.js')
const detail = require('../../apis/detail.js')
var ora = require('ora');
const spinner = ora('Loading unicorns');
const downloadIconfont = require('../../index.js')

module.exports = {
    name: 'pull <pid> <username> <password>',
    desc: 'pull any project iconfiles form iconfont with your account',
    action: function (pid, username, password, options) {
        const puppeteer = require('puppeteer');
        let projectId = pid
        async function launchChrome (username, password) {
            spinner.start('登录中...')
            const browser = await puppeteer.launch({
                headless: true
            })
            const page = await browser.newPage()
            await page.goto('https://www.iconfont.cn/login', {
                waitUntil: 'networkidle2',
            })
            //登录账号
            await page.evaluate(({username, password}) => {
                document.querySelector('#userid').value = username;
                document.querySelector('#password').value = password;
                document.querySelector('button[type=submit]').click();
            }, { username, password });
            spinner.succeed('登录成功')
            // 等待跳转成功
            await page.waitForNavigation({
                waitUntil: 'networkidle2',
            })
            // 获取所有cookie
            const cookies = await page.cookies()
            browser.close()
            const cookieMap = cookies.reduce((map, cookie) => {
                map[cookie.name] = cookie.value
                return map
            }, {})
            const fetchHeaderCookies = Object.keys(cookieMap).map(c => `${c}=${cookieMap[c]}`)
            try {
                spinner.start('刷新最新的icon链接中...')
                // 更新最新的链接
                cdn({
                    cookies: fetchHeaderCookies,
                    ctoken: cookieMap.ctoken,
                    pid: projectId
                })
                spinner.succeed('刷新最新的icon链接成功')
                // 获取项目最新的详情
                let detailInfo = await detail({
                    cookies: fetchHeaderCookies,
                    pid: projectId
                })
                spinner.start('下载文件到目标目录...')
                let params = {
                    url: `https:${detailInfo.font.css_file}`
                }
                if (options.filename) {
                    params.fileName = options.filename
                }
                if (options.dest) {
                    params.dest = options.dest
                }
                downloadIconfont(params)
                spinner.succeed('下载完成')
            } catch (error) {
                console.log(error)
                spinner.fail('Opps...拉取失败，试试自己手动下载吧')
            }
        }
        launchChrome(username, password)
    }
}