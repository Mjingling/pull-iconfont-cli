const downloadIconfont = require('./index.js')
let downloadUrl = 'https://at.alicdn.com/t/font_313726_0uhevtktz4ld.css'
let fileName = 'iconfont.css'
downloadIconfont({
    url: downloadUrl,
    fileName: fileName,
    dest: './css/icon/fonts'
})