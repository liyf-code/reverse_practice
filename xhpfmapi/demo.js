var CryptoJS = require('crypto-js'),
    v = CryptoJS.enc.Utf8.parse(CryptoJS.MD5("Xinhuamm@2018").toString());

function decrypt(t) {
    var data = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(t.data)
    }, v, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return data.toString(CryptoJS.enc.Utf8);
}

function get_encrypt_params(params) {
    var n = JSON.stringify(params),
        s = CryptoJS.TripleDES.encrypt(n, v, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return CryptoJS.enc.Base64.stringify(s.ciphertext);
}
