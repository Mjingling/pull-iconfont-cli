/*
 * @Author: xinxian_mu
 * @Date: 2021-09-02 10:21:46
 * @LastEditTime: 2021-09-02 10:42:33
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/apis/detail.js
 */

const axiosIns = require('../axios')

function detail ({ cookies, pid }) {
    return axiosIns.get(`/api/project/detail.json?pid=${pid}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
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

module.exports = detail