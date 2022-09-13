var CryptoJS = require('crypto-js');

function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding
    });
    var data = decrypted.toString(CryptoJS.enc.Utf8);
    var lastNum = data.lastIndexOf("}");
    data = JSON.parse(data.substring(0, lastNum + 1));
    return data;
}