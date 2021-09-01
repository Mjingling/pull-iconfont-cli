const fs = require('fs')
const path = require('path')
const pathExists = require('path-exists').sync
let request = require('request')
let downloadPath = path.resolve(__dirname, './font')
const defOptions = {
    fileName: 'iconfont.css',
    dest: downloadPath,
}

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
}
/**
 * @desc 下载iconfont 图标
 * @param { String } url iconfont中提供的项目在线链接，注意是 font class中的.css结尾的链接哦
 * @param { String } fileName 目标文件名
 */
function downloadIconfont (options) {
    let mergeOptions = Object.assign(defOptions, options)
    let { url, dest, fileName } = mergeOptions
    // 得到路径
    dest = path.resolve(dest)
    if (!pathExists(dest)) {
        mkdirsSync(dest)
    }
    let fileUrlArr = []
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            // 正则匹配出所有的字体url引用地址
            fileUrlArr = body.match(/url([\s\S]+?)[)]/ig)
            // = /url[(]([\s\S]+?)[)]/ig
            // 将url中引用的地址都下载至iconfont存储目录
            fileUrlArr.forEach(url => {
                let downloadUrl = 'https:' + url.substring(5, url.length - 2)
                downloadFile({
                    fileUrl: downloadUrl,
                    destPath: dest,
                    fileName: getPathName(fileName) + getPathExt(downloadUrl.split('?')[0]),
                })
            })
            // 将css文件中的url请求地址，替换为本地地址
            let pathName = getPathName(url)
            let urlParren = new RegExp(`\\/\\/at.alicdn.com\\/t\\/${pathName}`, 'ig')
            body = body.replace(urlParren, getPathName(fileName))
            body = body.replace('font-size: 16px;', '')
            fs.writeFileSync(path.resolve(dest, './'+ fileName), body)
        }
    })
}
/**
 * @desc 下载指定路径的文件到本地目标路径
 * @param { Object }
 * fileName 文件名
 * fileUrl 文件下载地址
 * destPath 文件目标路径
*/
function downloadFile ({ fileName, fileUrl, destPath }) {
    let stream = fs.createWriteStream(path.resolve(destPath, `./${fileName}`));
    request(fileUrl).pipe(stream).on("close", function (err) {
        console.log("file [" + fileName + "] downloaded");
    });
}

/**
 * @desc 获取无后缀名的文件名
 * @param { String } url 下载链接 示例 https://at.alicdn.com/t/font_313726_0uhevtktz4ld.css
 * @return { String } name font_313726_0uhevtktz4ld
*/
function getPathName(url) {
    return path.parse(url).name
}

/**
 * @desc 获取后缀名
 * @param { String } url 下载链接 示例 https://at.alicdn.com/t/font_313726_0uhevtktz4ld.eot
*/
function getPathExt(url) {
    return path.parse(url).ext
}

module.exports = downloadIconfont