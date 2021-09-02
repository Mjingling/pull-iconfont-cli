/*
 * @Author: xinxian_mu
 * @Date: 2021-09-02 09:31:59
 * @LastEditTime: 2021-09-02 09:32:26
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/axios.js
 */
let axios = require('axios')

const axiosIns = axios.create({
    baseURL: 'https://www.iconfont.cn',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Referer': 'https://www.iconfont.cn',
    }
});

module.exports = axiosIns