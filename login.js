/*
 * @Author: xinxian_mu
 * @Date: 2021-09-01 11:52:49
 * @LastEditTime: 2021-09-03 09:34:57
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/login.js
 */
const puppeteer = require('puppeteer');
const getAllMyProjects = require('./apis/myprojects.js');
const cdn = require('./apis/cdn.js');
const detail = require('./apis/detail.js');

let projectId = 915013

function getAuthCookie (cookies) {
    let autoCookieItem = cookies.filter(c => c.name === 'EGG_SESS_ICONFONT')
    return autoCookieItem.length > 0 ? autoCookieItem[0].value : null
}

async function launchChrome() {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()
    await page.goto('https://www.iconfont.cn/login', {
        waitUntil: 'networkidle2',
    })
    //登录账号
    await page.evaluate(() => {
        document.querySelector('#userid').value = '15611192643';
        document.querySelector('#password').value = 'jingling2iconfont';
        document.querySelector('button[type=submit]').click();
    });
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
    console.log(cookieMap)
    console.log(getAuthCookie(cookies))
    const fetchHeaderCookies = Object.keys(cookieMap).map(c => `${c}=${cookieMap[c]}`)
    try {
        // 获取我所有的项目
        let myProjects = await getAllMyProjects({
            cookies: fetchHeaderCookies,
            ctoken: cookieMap.ctoken
        })
        console.log(myProjects)
        // 更新最新的链接
        cdn({
            cookies: fetchHeaderCookies,
            ctoken: cookieMap.ctoken,
            pid: projectId
        })
        // 获取项目最新的详情
        let detailInfo = await detail({
            cookies: fetchHeaderCookies,
            pid: projectId
        })
        console.log(detailInfo.font.css_file)
    } catch (error) {
        console.log(error)
    }
}

launchChrome()