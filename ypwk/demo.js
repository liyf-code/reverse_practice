/*
* 一品威客（https://www.epwk.com/login.html）登录破解
* 接口：https://www.epwk.com/api/epwk/v1/user/login
    - post请求
    - 参数以明文的形式传递
      - data = {
            'username': '账号',
            'password': '明文密码',
            'code': '',
            'hdn_refer': '',
        }
* 破解参数：请求头中的Signature的值
* todo 思路如下：
* 全局搜索 `Signature`，很容易定位到加密位置
* 下断点，重新请求，然后跟进去代码，可以定位到关键的加密函数，如下
    ```
    var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
      , e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "a75846eb4ac490420ac63db46d2a03bf"
      , r = e + d(data) + d(t) + e;
    return r = f(r),
        r = m(r)
     ```

* 经过两次加密，首先经过md5加密，r = f(r)，其中f函数实现对参数r进行md5加密
* 其次经过 `AES-CBC-Pkcs7` 模式加密，k和iv都能获取到。
    ```
    return function(data) {
        return c.a.AES.encrypt(data, l.key, {
            iv: l.iv,
            mode: c.a.mode.CBC,
            padding: c.a.pad.Pkcs7
        }).toString()
    }(data)
    ```
* 最终得到Signature的值
*/

var CryptoJS = require('crypto-js');

var d = function (t) {
        var e = "";
        return Object.keys(t).sort().forEach((function (r) {
                e += r + ("object" === n_a(t[r]) ? JSON.stringify(t[r], (function (t, e) {
                        return "number" == typeof e && (e = String(e)),
                            e
                    }
                )).replace(/\//g, "\\/") : t[r])
            }
        )),
            e
    },
    f = function (data) {
        return CryptoJS.MD5(data).toString()
    },
    l_t = {
        key: CryptoJS.enc.Utf8.parse("fX@VyCQVvpdj8RCa"),
        iv: CryptoJS.enc.Utf8.parse(function (t) {
            for (var e = "", i = 0; i < t.length - 1; i += 2) {
                var r = parseInt(t[i] + "" + t[i + 1], 16);
                e += String.fromCharCode(r)
            }
            return e
        }("00000000000000000000000000000000"))
    },
    m = function (data) {
        return function (data) {
            return CryptoJS.AES.encrypt(data, l_t.key, {
                iv: l_t.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString()
        }(data)
    };

function n_a(e) {
    return typeof e
}

function h_e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5;
    return Math.random().toString(36).substring(3, 3 + e)
}

function get_signature(ts) {
    var l = {
            "i": false,
            "j": false,
            "h": true,
            "d": "prod",
            "a": "https://s1.weikeimg.com/_nuxt/",
            "e": "https://im2.epwitkey.com",
            "b": "4ac490420ac63db4",
            "c": "a75846eb4ac490420ac63db46d2a03bf",
            "f": "af9f93d4530c6167",
            "g": "c93ce713af9f93d4530c6167b78a3871"
        },
        t = {
            "App-Ver": "",
            "Os-Ver": "",
            "Device-Ver": "",
            Imei: "",
            "Access-Token": "",
            Timestemp: ts,
            NonceStr: "".concat(ts).concat(h_e()),
            "App-Id": l.j ? l.f : l.b,
            "Device-Os": "web"
        };
    var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        , e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "a75846eb4ac490420ac63db46d2a03bf"
        , r = e + d(data) + d(t) + e
        , r = f(r),
        r = m(r);
    return {signature: r, params: t}
}

var ts = parseInt((new Date).getTime() / 1e3);
console.log(get_signature(ts))