# pull-iconfont-cli

从 iconfont 拉取项目图标文件到本地

### 安装

```
npm i pull-iconfont-cli -D
```

### 使用
```javascript
const downloadIconfont = require('pull-iconfont-cli')
let downloadUrl = 'https://at.alicdn.com/t/font_313726_0uhevtktz4ld.css'
let fileName = 'iconfont.css'
downloadIconfont({
    url: downloadUrl,
    fileName: fileName,
    dest: './css/icon/fonts'
})
```
### 下载后文件目录结构


```shell
├── font
│   ├── iconfont.css
│   ├── iconfont.eot
│   └── iconfont.woff
```
### 选项说明

|  选项名   | 解释 | 是否必选  | 默认值 |
|  ----  | ---- | ----  |  ----  |
| url   | iconfont中提供的项目在线链接，注意是 font class中的.css结尾的链接哦 | 必选 | 无 |
| fileName | 下载后文件名  | 可选 | iconfont.css |
| dest   | 下载后输出目录 | 可选 | 当前目录下/font文件夹 |

### cli方式使用

```
npx pull-iconfont-cli download https://at.alicdn.com/t/font_313726_0uhevtktz4ld.css -f iconfont.css   -d ./src/common/css/UI/font
```