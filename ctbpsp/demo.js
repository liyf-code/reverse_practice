var CryptoJS = require('crypto-js');

function decryptByDES(ciphertext) {
    // todo changelog20230314
    // 更改了key
    // ctpstp@custominfo!@#qweASD 变为了 1qaz@wsx3e

    // var keyHex = CryptoJS.enc.Utf8.parse("ctpstp@custominfo!@#qweASD");
    var keyHex = CryptoJS.enc.Utf8.parse("1qaz@wsx3e");
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt(
        {
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
        },
        keyHex,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}