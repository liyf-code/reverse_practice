/*
全局搜索请求头关键字 'ehsy-verify'
搜索结果只有一个，代码如下:
     "ehsy-verify": (0, o.aes_gobal)()
在该处下断点。下拉页面，断点生效。

- 进入该函数内部，可定位到请求头参数生成的具体逻辑

todo 逻辑如下
    - 生成一个长度为10的时间戳，并转字符串 t
    - 对该时间戳 t 进行md5加密得到n
    - 对 n 进行一系列数组操作
        - n.splice(2, 1, "e")，意思是在索引为2的位置删除一个元素，并添加新元素 'e'
    - 之后再把新数组转字符串，并加上最开始的时间戳 t。作为aes待加密的数据
    - aes的key就是对字符串 GvcaHhBsKa9kkHmf 进行md5加密
    - 最终返回的至就是请求头的值
*/


var CryptoJS = require('crypto-js');

function g(e) {
    var n = CryptoJS.enc.Utf8.parse(e)
        , i = CryptoJS.MD5('GvcaHhBsKa9kkHmf')
        , o = CryptoJS.AES.encrypt(n, i, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return o.toString()
}

function p() {
    var n, i, o, t = ((new Date).getTime() + "").slice(0, 10);
    var e = CryptoJS.MD5(t).toString();
    return n = e.split(""),
        n.splice(2, 1, "e"),
        n.splice(6, 1, "h"),
        n.splice(12, 1, 6),
        n.splice(25, 1, "b"),
        i = n.join("") + t,
        o = g(i),
        o
}
