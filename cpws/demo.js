window = global;
var CryptoJS = require('crypto-js')

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var DES3 = {
    iv: function () {
        // 本地改写，返回时间格式。eg：20221129
        return new Date().Format("yyyyMMdd")
    },
    encrypt: function (b, c, a) {
        if (c) {
            return (CryptoJS.TripleDES.encrypt(b, CryptoJS.enc.Utf8.parse(c), {
                iv: CryptoJS.enc.Utf8.parse(a || DES3.iv()),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })).toString()
        }
        return ""
    },
    decrypt: function (b, c, a) {
        if (c) {
            return CryptoJS.enc.Utf8.stringify(CryptoJS.TripleDES.decrypt(b, CryptoJS.enc.Utf8.parse(c), {
                iv: CryptoJS.enc.Utf8.parse(a || DES3.iv()),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })).toString()
        }
        return ""
    }
};

var data_result = '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',
    data_secretkey = 'WxKSeLNNUbU621NwL2Fs5Ekx',
    obj = DES3.decrypt(data_result, data_secretkey);
console.log(JSON.parse(obj).queryResult.resultList)


