var CryptoJS = require('crypto-js');
var k = '55b3b62613aef1a0';

function aes_decrypt(e) {
    var a = k.split("").reverse().join("");
    return decrypt(a, e)
}

function aes_encrypt(e) {
    return encrypt(k, e)
}

function decrypt(e, a) {
    e = CryptoJS.enc.Utf8.parse(e);
    var l = CryptoJS.AES.decrypt(a, e, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: e
    });
    return CryptoJS.enc.Utf8.stringify(l).toString()
}

function encrypt(e, a) {
    return e = CryptoJS.enc.Utf8.parse(e),
        a = CryptoJS.enc.Utf8.parse(a),
        CryptoJS.AES.encrypt(a, e, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: e
        }).toString()
}

function get_encrypt_params(page) {
    var a = {
            "Type": 0,
            "page": page,
            "expire": (new Date).getTime()
        },
        data = aes_encrypt(JSON.stringify(a));
    return data
}

function get_decrypt_res(encrypt_data) {
    var decrypt_res = aes_decrypt(encrypt_data);
    return JSON.parse(decrypt_res)
}

