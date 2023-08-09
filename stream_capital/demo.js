var CryptoJS = require('crypto-js');
var nh = CryptoJS.enc.Utf8.parse("r4rt5A8L6ye6ts8y"),
    rh = CryptoJS.enc.Utf8.parse("fs0Hkjg8a23u8sE0"),
    oh = {
        Decrypt: function (e) {
            if (0 === e.length)
                return e;
            var t = CryptoJS.AES.decrypt(e, nh, {
                iv: rh,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
                , n = CryptoJS.enc.Utf8.stringify(t);
            return JSON.parse(n)
        },
        Encrypt: function (e) {
            var t = JSON.stringify(e);
            return CryptoJS.AES.encrypt(t, nh, {
                iv: rh,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString()
        }
    };

function get_enc_para(page) {
    var params = {
        "type": 0,
        "name": null,
        "page": page
    };
    return oh.Encrypt(params)
}
