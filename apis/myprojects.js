/*
 * @Author: xinxian_mu
 * @Date: 2021-09-02 09:33:33
 * @LastEditTime: 2021-09-02 09:59:44
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/apis/myprojects.js
 */
const axiosIns = require('../axios')

function getAllMyProjects(cookie) {
    return axiosIns.get('/api/user/myprojects.json?page=1&t=1630466751287&ctoken=uJL6zVy-jq72CP3QJ8M6pnQ2', {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Cookie: cookie
        }
    }).then(response => {
        if (response.data.code === 200) {
            let { ownProjects, corpProjects, delProjects } = response.data.data
            return ownProjects.concat(corpProjects.concat(delProjects))
        } else {
            let msg = response.data.error || '加载失败！'
            return Promise.reject(new Error(msg))
        }
    }).catch(e => {
        console.log(e.message)
    })
}

module.exports = getAllMyProjects