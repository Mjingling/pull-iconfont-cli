/*
 * @Author: xinxian_mu
 * @Date: 2021-06-11 12:51:55
 * @LastEditTime: 2021-09-03 11:00:16
 * @LastEditors: xinxian_mu
 * @Description: 
 * @FilePath: /cloudflow/Users/baymax/Desktop/workspace/pull-iconfont-cli/demo/demo.js
 */
const downloadIconfont = require('../index.js')
let downloadUrl = 'https://at.alicdn.com/t/font_313726_0uhevtktz4ld.css'
let fileName = 'iconfont.css'
downloadIconfont({
    url: downloadUrl,
    fileName: fileName,
    dest: './css/icon/fonts'
})