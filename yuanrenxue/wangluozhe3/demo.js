var CryptoJS = require('crypto-js');

function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
}

function get_signature() {
    var message = 'https://wangluozhe.com/challenge/3';
    message = message + '|' + Date.parse(new Date()).toString();
    var key = Date.parse(new Date()).toString(),
        sign = encryptByDES(message, key);
    return sign
}