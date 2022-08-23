function y(e) {
    e = e.replace(/\x0d\x0a/g, "\n");
    for (var n = "", t = 0; t < e.length; t++) {
        var i = e.charCodeAt(t);
        i < 128 ? n += String.fromCharCode(i) : i > 127 && i < 2048 ? (n += String.fromCharCode(i >> 6 | 192),
            n += String.fromCharCode(63 & i | 128)) : (n += String.fromCharCode(i >> 12 | 224),
            n += String.fromCharCode(i >> 6 & 63 | 128),
            n += String.fromCharCode(63 & i | 128))
    }
    return n
}

function f(e) {
    var n, t = e.length, i = t + 8, o = (i - i % 64) / 64, r = 16 * (o + 1), a = Array(r - 1), c = 0, s = 0;
    while (s < t)
        n = (s - s % 4) / 4,
            c = s % 4 * 8,
            a[n] = a[n] | e.charCodeAt(s) << c,
            s++;
    return n = (s - s % 4) / 4,
        c = s % 4 * 8,
        a[n] = a[n] | 128 << c,
        a[r - 2] = t << 3,
        a[r - 1] = t >>> 29,
        a
}

function o(e, n) {
    var t, i, o, r, a;
    return o = 2147483648 & e,
        r = 2147483648 & n,
        t = 1073741824 & e,
        i = 1073741824 & n,
        a = (1073741823 & e) + (1073741823 & n),
        t & i ? 2147483648 ^ a ^ o ^ r : t | i ? 1073741824 & a ? 3221225472 ^ a ^ o ^ r : 1073741824 ^ a ^ o ^ r : a ^ o ^ r
}

function u(e, n, t, a, c, s, u) {
    return e = o(e, o(o(r(n, t, a), c), u)),
        o(i(e, s), n)
}

function r(e, n, t) {
    return e & n | ~e & t
}

function a(e, n, t) {
    return e & t | n & ~t
}

function c(e, n, t) {
    return e ^ n ^ t
}

function s(e, n, t) {
    return n ^ (e | ~t)
}

function i(e, n) {
    return e << n | e >>> 32 - n
}

function d(e, n, t, r, c, s, u) {
    return e = o(e, o(o(a(n, t, r), c), u)),
        o(i(e, s), n)
}

function l(e, n, t, r, a, s, u) {
    return e = o(e, o(o(c(n, t, r), a), u)),
        o(i(e, s), n)
}

function p(e, n, t, r, a, c, u) {
    return e = o(e, o(o(s(n, t, r), a), u)),
        o(i(e, c), n)
}

function m(e) {
    var n, t, i, r, a, c, s, m, h, b = [], v = 7, x = 12, _ = 17, w = 22, C = 5, S = 9, T = 14, P = 20, E = 4, I = 11,
        A = 16, k = 23, O = 6, B = 10, D = 15, L = 21;
    for (e = y(e),
             b = f(e),
             c = 1732584193,
             s = 4023233417,
             m = 2562383102,
             h = 271733878,
             n = 0; n < b.length; n += 16)
        t = c,
            i = s,
            r = m,
            a = h,
            c = u(c, s, m, h, b[n + 0], v, 3614090360),
            h = u(h, c, s, m, b[n + 1], x, 3905402710),
            m = u(m, h, c, s, b[n + 2], _, 606105819),
            s = u(s, m, h, c, b[n + 3], w, 3250441966),
            c = u(c, s, m, h, b[n + 4], v, 4118548399),
            h = u(h, c, s, m, b[n + 5], x, 1200080426),
            m = u(m, h, c, s, b[n + 6], _, 2821735955),
            s = u(s, m, h, c, b[n + 7], w, 4249261313),
            c = u(c, s, m, h, b[n + 8], v, 1770035416),
            h = u(h, c, s, m, b[n + 9], x, 2336552879),
            m = u(m, h, c, s, b[n + 10], _, 4294925233),
            s = u(s, m, h, c, b[n + 11], w, 2304563134),
            c = u(c, s, m, h, b[n + 12], v, 1804603682),
            h = u(h, c, s, m, b[n + 13], x, 4254626195),
            m = u(m, h, c, s, b[n + 14], _, 2792965006),
            s = u(s, m, h, c, b[n + 15], w, 1236535329),
            c = d(c, s, m, h, b[n + 1], C, 4129170786),
            h = d(h, c, s, m, b[n + 6], S, 3225465664),
            m = d(m, h, c, s, b[n + 11], T, 643717713),
            s = d(s, m, h, c, b[n + 0], P, 3921069994),
            c = d(c, s, m, h, b[n + 5], C, 3593408605),
            h = d(h, c, s, m, b[n + 10], S, 38016083),
            m = d(m, h, c, s, b[n + 15], T, 3634488961),
            s = d(s, m, h, c, b[n + 4], P, 3889429448),
            c = d(c, s, m, h, b[n + 9], C, 568446438),
            h = d(h, c, s, m, b[n + 14], S, 3275163606),
            m = d(m, h, c, s, b[n + 3], T, 4107603335),
            s = d(s, m, h, c, b[n + 8], P, 1163531501),
            c = d(c, s, m, h, b[n + 13], C, 2850285829),
            h = d(h, c, s, m, b[n + 2], S, 4243563512),
            m = d(m, h, c, s, b[n + 7], T, 1735328473),
            s = d(s, m, h, c, b[n + 12], P, 2368359562),
            c = l(c, s, m, h, b[n + 5], E, 4294588738),
            h = l(h, c, s, m, b[n + 8], I, 2272392833),
            m = l(m, h, c, s, b[n + 11], A, 1839030562),
            s = l(s, m, h, c, b[n + 14], k, 4259657740),
            c = l(c, s, m, h, b[n + 1], E, 2763975236),
            h = l(h, c, s, m, b[n + 4], I, 1272893353),
            m = l(m, h, c, s, b[n + 7], A, 4139469664),
            s = l(s, m, h, c, b[n + 10], k, 3200236656),
            c = l(c, s, m, h, b[n + 13], E, 681279174),
            h = l(h, c, s, m, b[n + 0], I, 3936430074),
            m = l(m, h, c, s, b[n + 3], A, 3572445317),
            s = l(s, m, h, c, b[n + 6], k, 76029189),
            c = l(c, s, m, h, b[n + 9], E, 3654602809),
            h = l(h, c, s, m, b[n + 12], I, 3873151461),
            m = l(m, h, c, s, b[n + 15], A, 530742520),
            s = l(s, m, h, c, b[n + 2], k, 3299628645),
            c = p(c, s, m, h, b[n + 0], O, 4096336452),
            h = p(h, c, s, m, b[n + 7], B, 1126891415),
            m = p(m, h, c, s, b[n + 14], D, 2878612391),
            s = p(s, m, h, c, b[n + 5], L, 4237533241),
            c = p(c, s, m, h, b[n + 12], O, 1700485571),
            h = p(h, c, s, m, b[n + 3], B, 2399980690),
            m = p(m, h, c, s, b[n + 10], D, 4293915773),
            s = p(s, m, h, c, b[n + 1], L, 2240044497),
            c = p(c, s, m, h, b[n + 8], O, 1873313359),
            h = p(h, c, s, m, b[n + 15], B, 4264355552),
            m = p(m, h, c, s, b[n + 6], D, 2734768916),
            s = p(s, m, h, c, b[n + 13], L, 1309151649),
            c = p(c, s, m, h, b[n + 4], O, 4149444226),
            h = p(h, c, s, m, b[n + 11], B, 3174756917),
            m = p(m, h, c, s, b[n + 2], D, 718787259),
            s = p(s, m, h, c, b[n + 9], L, 3951481745),
            c = o(c, t),
            s = o(s, i),
            m = o(m, r),
            h = o(h, a);
    var R = g(c) + g(s) + g(m) + g(h);
    return R.toLowerCase()
}

function g(e) {
    var n, t, i = "", o = "";
    for (t = 0; t <= 3; t++)
        n = e >>> 8 * t & 255,
            o = "0" + n.toString(16),
            i += o.substr(o.length - 2, 2);
    return i
}

function C(e) {
    var n = ""
        , t = function (e) {
        if (null === e)
            return "";
        if (e instanceof Array) {
            var n = "";
            return e.forEach((function (e) {
                    n.length > 0 && (n += ","),
                        n += JSON.stringify(e)
                }
            )),
                n
        }
        return e instanceof Object ? JSON.stringify(e) : e.toString()
    };
    return n = Object.keys(e).sort().reduce((function (n, i) {
            return void 0 === e[i] ? n : "".concat(n).concat(i).concat(t(e[i]))
        }
    ), ""),
        n += "048a9c4943398714b356a696503d2d36",
        m(n)
}

function get_sign(lastId) {
    var params = {
        isVisitor: false,
        lastId: lastId,
        limit: 20,
        newAdvForH5: true,
        platform: "h5",
        tabId: "",
        version: "4.73.0"
    }
    return C(params)
}