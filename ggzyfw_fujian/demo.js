var CryptoJS = require('crypto-js')

function b(e) {
    var t = CryptoJS.enc.Utf8.parse('BE45D593014E4A4EB4449737660876CE')
        , n = CryptoJS.enc.Utf8.parse('A8909931867B0425')
        , a = CryptoJS.AES.decrypt(e, t, {
        iv: n,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return a.toString(CryptoJS.enc.Utf8)
}