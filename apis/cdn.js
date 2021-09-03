/*
 * @Author: xinxian_mu
 * @Date: 2021-09-02 10:10:53
 * @LastEditTime: 2021-09-03 09:27:43
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/apis/cdn.js
 */
const axiosIns = require('../axios')
const querystring = require('querystring');
function cdn ({ cookies, ctoken, pid }) {
    let params = {
        pid: pid,
        t: new Date().getTime(),
        ctoken: ctoken,
    }
    return axiosIns.post('/api/project/cdn.json', querystring.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            Cookie: cookies
        }
    }).then(response => {
        if (response.data.code === 200) {
            return response.data.data
        } else {
            let msg = response.data.error || '加载失败！'
            return Promise.reject(new Error(msg))
        }
    }).catch(e => {
        console.log(e.message)
    })
}

module.exports = cdn