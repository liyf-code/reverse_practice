var CryptoJS = require('crypto-js');

var e1 = '16weizifuchuan16',
    i1 = '1suibianshurude6';

function get_decrypt_data(t) {
    var s = CryptoJS["enc"].Utf8.parse(e1),
        n = CryptoJS["enc"].Utf8.parse(i1),
        o = CryptoJS["AES"].decrypt(CryptoJS["format"].Hex.parse(t), s, {
            iv: n,
            mode: CryptoJS["mode"].CBC,
            padding: CryptoJS["pad"].Pkcs7
        });
    return JSON.parse(CryptoJS["enc"].Utf8.stringify(o).toString())
}

function get_encrypt_params(para) {
    var s = CryptoJS["enc"].Utf8.parse(e1),
        n = CryptoJS["enc"].Utf8.parse(i1),
        o = CryptoJS["enc"].Utf8.parse(JSON.stringify(para)),
        c = CryptoJS["AES"].encrypt(o, s, {
            iv: n,
            mode: CryptoJS["mode"].CBC,
            padding: CryptoJS["pad"].Pkcs7
        });
    return c.ciphertext.toString()
}

var encrypt_data = {
        "newsType": 1,
        "pageNum": 6,
        "pageSize": 10,
        "title": ""
    },
    decrypt_data = get_encrypt_params(encrypt_data);
console.log(decrypt_data)
