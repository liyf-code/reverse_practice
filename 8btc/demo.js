var CryptoJS = require('crypto-js');

function get_device_id(e, t) {
    for (var n = "", a = t ? Math.round(Math.random() * (t - e)) + e : e, i = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], r = 0; r < a; r++) {
        n += i[Math.round(Math.random() * (i.length - 1))]
    }
    return n
}

function get_sign(c) {
    var e = JSON.stringify(c),
        t = 'WTAHAPPYACTIVITY';
    var n = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }
        , a = CryptoJS.enc.Utf8.parse(t);
    return CryptoJS.AES.encrypt(e, a, n).toString().replace(/\//g, "_").replace(/\+/g, "-")
}
