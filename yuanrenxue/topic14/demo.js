var CryptoJS = require('crypto-js')

var window = {}


function aes_encrypt(word) {
    var k = 'wdf2ff*TG@*(F4)*YH)g430HWR(*)' + 'wse';
    var key = CryptoJS.enc.Utf8.parse(k);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function get_uc(page) {
    window.t = Date.parse(new Date()) / 1000;
    word = window.t + '|' + page
    uc = aes_encrypt(word)
    return uc
}
