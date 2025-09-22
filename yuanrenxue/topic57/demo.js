var CryptoJS = require('crypto-js')

function I(X, l) {
    var C = X
        , q = CryptoJS.enc.Utf8.parse(C)
        , v = CryptoJS.TripleDES.decrypt(l, q, {
        'mode': CryptoJS.mode.ECB,
        'padding': CryptoJS.pad.Pkcs7
    });
    return v.toString(CryptoJS.enc.Utf8);
}

function get_data_list(result) {
    var datas = JSON.parse(I(result.slice(0, 8), result.slice(8)))['data']
    return datas
}