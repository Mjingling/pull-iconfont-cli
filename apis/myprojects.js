/*
 * @Author: xinxian_mu
 * @Date: 2021-09-02 09:33:33
 * @LastEditTime: 2021-09-03 09:30:57
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/apis/myprojects.js
 */
const axiosIns = require('../axios')

function getAllMyProjects ({ cookies, ctoken, }) {
    let paramsString = `page=1&t=${new Date().getTime()}&ctoken=${ctoken}&pageSize=100`
    return axiosIns.get(`/api/user/myprojects.json?${paramsString}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Cookie: cookies
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