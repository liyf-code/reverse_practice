var CryptoJS = require('crypto-js'),
    // Object(u["c"]
    T = function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
            , t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
            , a = t.enc
            , r = void 0 === a ? "Utf8" : a
            , c = t.mode
            , i = void 0 === c ? "ECB" : c
            , o = t.padding
            , u = void 0 === o ? "Pkcs7" : o
            , d = CryptoJS.enc[r].parse(n)
            , l = {
            mode: CryptoJS.mode[i],
            padding: CryptoJS.pad[u]
        }
            , s = CryptoJS.TripleDES.encrypt(e, d, l);
        return s.toString()
    },
    // Object(u["f"])
    F = function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (e && "string" === typeof e) {
            var t = n.text || "0"
                , a = n.length || 24;
            if (e.length < a)
                for (var r = e.length; r < a; r++)
                    e += t;
            else
                e = e.substring(0, a);
            return e
        }
    };

//password: encodeURI(Object(u["c"])(s.value, Object(u["f"])(Object(u["g"])(r.value))))
function get_pwd(pwd, username) {
    return encodeURI(T(pwd, F(username)))
}

var pwd = '123456',
    username = 'liyufeng123',
    enc_pwd = get_pwd(pwd, username);
console.log(enc_pwd)
