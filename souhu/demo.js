/*
搜狐网，新闻详情页(https://www.sohu.com/a/611710835_123753)
图片解密

请求url地址，返回响应数据，返回的图片地址是加密的，但是所在的img标签的属性为data-src

故全局搜索data-src关键字，定位到关键代码
aes解密
*/

window = global;
var CryptoJS = require('crypto-js')

function e(e, t) {
    return CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse(t), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
}

var o = '9T8IQfyP7e1sMsEyWbYPvujwr47D8luFD15aBAmwHor+FqTy1mjFyNrrLjJO3WxqRwAgxG5o8r1Lcqis/SEI2lID2kTy3JccQzzIBZfATLE=',
    s = e(o, "www.souhu.com6666"),
    url = 'https:' + s;
console.log('需要解密的data-src值:', o)
console.log('解密后的值:', url)
