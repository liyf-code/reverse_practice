window = global;

var CryptoJS = require('crypto-js');
let date = Date.parse(new Date()),
    key_tmp = date * 1234,
    iv_tmp = date * 4321,
    key = CryptoJS.enc.Utf8.parse(key_tmp),
    iv = CryptoJS.enc.Utf8.parse(iv_tmp);
(function tmp(date, key, iv) {
    function Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString().toUpperCase();
    }

    window.sign = Encrypt(date);
})(date, key, iv);

function get_signature() {
    return window.sign
}