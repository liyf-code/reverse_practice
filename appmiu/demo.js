var h = '富强民主文明和谐自由平等公正法治爱国敬业诚信友善';

function e() {
    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
    var e = n.length
        , i = "string" == typeof n[e - 1] ? n[e - 1] : "Assert Error"
        , o = !0
        , u = !1
        , c = void 0;
    try {
        for (var f, a = n[Symbol.iterator](); !(o = (f = a.next()).done); o = !0) {
            if (!f.value)
                throw new Error(i)
        }
    } catch (t) {
        u = !0,
            c = t
    } finally {
        try {
            !o && a.return && a.return()
        } finally {
            if (u)
                throw c
        }
    }
}

function i() {
    return Math.random() >= .5
}

function c(t) {
    e("string" == typeof t);
    var n = []
        , r = !0
        , o = !1
        , u = void 0;
    try {
        for (var c, f = t[Symbol.iterator](); !(r = (c = f.next()).done); r = !0) {
            var a = c.value
                , s = Number.parseInt(a, 16);
            s < 10 ? n.push(s) : i() ? (n.push(10),
                n.push(s - 10)) : (n.push(11),
                n.push(s - 6))
        }
    } catch (t) {
        o = !0,
            u = t
    } finally {
        try {
            !r && f.return && f.return()
        } finally {
            if (o)
                throw u
        }
    }
    return n
}

function o(t) {
    var n = /[A-Za-z0-9\-\_\.\!\~\*\'\(\)]/g
        , r = t.replace(n, function (t) {
        return t.codePointAt(0).toString(16)
    });
    return encodeURIComponent(r).replace(/%/g, "").toUpperCase()
}

function a(t) {
    return t.map(function (t) {
        return h[2 * t] + h[2 * t + 1]
    }).join("")
}

function l(t) {
    return a(c(o(t)))
}

// https://www.appmiu.com/key/
var key = '123456',
    res = l(key);
console.log(res)