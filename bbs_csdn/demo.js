var CryptoJS = require('crypto-js');

var m = function (e) {
    var t = {};
    for (var n in e) {
        var o = n.toLowerCase();
        o.startsWith("x-ca-") && ("x-ca-signature" !== o && "x-ca-signature-headers" !== o && "x-ca-key" !== o && "x-ca-nonce" !== o || (t[o] = e[n]))
    }
    return t
}, f = function (e) {
    var t = e || null;
    return null == t && (t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (e) {
            var t = 16 * Math.random() | 0;
            return ("x" === e ? t : 3 & t | 8).toString(16)
        }
    ))),
        t
};

function u(e, t) {
    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (!n) {
        if (Array.isArray(e) || (n = function (e, t) {
            if (!e)
                return;
            if ("string" == typeof e)
                return p(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n)
                return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return p(e, t)
        }(e)) || t && e && "number" == typeof e.length) {
            n && (e = n);
            var o = 0
                , i = function () {
            };
            return {
                s: i,
                n: function () {
                    return o >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[o++]
                    }
                },
                e: function (e) {
                    throw e
                },
                f: i
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var s, r = !0, a = !1;
    return {
        s: function () {
            n = n.call(e)
        },
        n: function () {
            var e = n.next();
            return r = e.done,
                e
        },
        e: function (e) {
            a = !0,
                s = e
        },
        f: function () {
            try {
                r || null == n.return || n.return()
            } finally {
                if (a)
                    throw s
            }
        }
    }
}

function h(e) {
    var t = e.method
        , n = e.url
        , o = e.appSecret
        , i = e.accept
        , s = e.date
        , r = e.contentType
        , a = e.params
        , l = e.headers
        , c = "";
    a || -1 === n.indexOf("?") ? a || (a = {}) : (a = function (e) {
        var t = {}
            , n = e.match(/[?&]([^=&#]+)=([^&#]*)/g);
        if (n)
            for (var o in n) {
                var i = n[o].split("=")
                    , s = i[0].substr(1)
                    , r = i[1];
                t[s] ? t[s] = [].concat(t[s], r) : t[s] = r
            }
        return t
    }(n),
        n = n.split("?")[0]);
    c += "".concat(t, "\n"),
        c += "".concat(i, "\n"),
        c += "".concat("", "\n"),
        c += "".concat(r, "\n"),
        c += "".concat(s, "\n");
    var p, f = m(l), h = u(Array.from(Object.keys(f)).sort());
    try {
        for (h.s(); !(p = h.n()).done;) {
            var v = p.value;
            c += v + ":" + f[v] + "\n"
        }
    } catch (e) {
        h.e(e)
    } finally {
        h.f()
    }
    return c += function (e, t) {
        var n, o = null, i = u(Array.from(Object.keys(t)).sort());
        try {
            for (i.s(); !(n = i.n()).done;) {
                var s = n.value
                    , r = void 0;
                null !== t[s] && void 0 !== t[s] && (r = "" !== t[s] ? s + "=" + t[s] : s + t[s],
                    o = o ? o + "&" + r : r)
            }
        } catch (e) {
            i.e(e)
        } finally {
            i.f()
        }
        return o ? e + "?" + o : e
    }(n.replace(/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.csdn\.net)/, ""), a),
        CryptoJS.HmacSHA256(c, o).toString(CryptoJS.enc.Base64)
}

function get_nonce_signature(page) {
    var nonce = f(),
        payload = {
            "method": "GET",
            "url": "https://bizapi.csdn.net/community-cloud/v1/colleges/main_page/list",
            "accept": "application/json, text/plain, */*",
            "params": {
                "deviceType": "pc",
                "page": page,
                "pageSize": 20,
                "category": 37,
                "sort": "desc",
                "type": 2
            },
            "date": "",
            "contentType": "",
            "headers": {
                "common": {
                    "Accept": "application/json, text/plain, */*"
                },
                "delete": {},
                "get": {},
                "head": {},
                "post": {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                "put": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "patch": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "X-Ca-Key": 203899271,
                "X-Ca-Nonce": nonce
            },
            "appSecret": "bK9jk5dBEtjauy6gXL7vZCPJ1fOy076H"
        },
        signature = h(payload);
    return {
        nonce: nonce,
        signature: signature
    }
}
