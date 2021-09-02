/*
 * @Author: xinxian_mu
 * @Date: 2021-09-02 10:10:53
 * @LastEditTime: 2021-09-02 10:49:14
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/apis/cdn.js
 */
const axiosIns = require('../axios')

function cdn ({ cookies }) {
    let params = {
        pid: '915013',
        t: '1630466843637',
        ctoken: 'uJL6zVy-jq72CP3QJ8M6pnQ2',
    }
    return axiosIns.post('/api/project/cdn.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            Cookie: cookies
        }
    }).then(response => {
        if (response.data.code === 200) {
            console.log(response.data.data)
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