/*
 * @Author: xinxian_mu
 * @Date: 2021-09-02 09:31:59
 * @LastEditTime: 2021-09-03 09:21:33
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/axios.js
 */
let axios = require('axios')

const axiosIns = axios.create({
    baseURL: 'https://www.iconfont.cn',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Referer': 'https://www.iconfont.cn',
    }
});

module.exports = axiosIns