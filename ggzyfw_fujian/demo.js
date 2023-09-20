var CryptoJS = require('crypto-js')

function b(e) {
    var t = CryptoJS.enc.Utf8.parse('EB444973714E4A40876CE66BE45D5930')
        , n = CryptoJS.enc.Utf8.parse('B5A8904209931867')
        , a = CryptoJS.AES.decrypt(e, t, {
        iv: n,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return a.toString(CryptoJS.enc.Utf8)
}