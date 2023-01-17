var a = 0;

function S(n) {
    for (var e = Object.keys(n).sort(), t = {}, a = 0; a < e.length; a++)
        t[e[a]] = n[e[a]];
    return t
}

function P(n) {
    var e = []
        , t = "";
    for (var a in n)
        e.push(n[a]);
    for (var i = 0; i < e.length; i++)
        t += e[i] + "";
    return t += "JzyqgcoojMiQNuQoTlbR5EBT8TsqzJ",
        t
}

function i(n) {
    return c(o(s(n)))
}

function d(n, e) {
    n[e >> 5] |= 128 << e % 32,
        n[14 + (e + 64 >>> 9 << 4)] = e;
    for (var t = 1732584193, a = -271733879, i = -1732584194, o = 271733878, c = 0; c < n.length; c += 16) {
        var s = t
            , l = a
            , r = i
            , d = o;
        t = h(t, a, i, o, n[c + 0], 7, -680876936),
            o = h(o, t, a, i, n[c + 1], 12, -389564586),
            i = h(i, o, t, a, n[c + 2], 17, 606105819),
            a = h(a, i, o, t, n[c + 3], 22, -1044525330),
            t = h(t, a, i, o, n[c + 4], 7, -176418897),
            o = h(o, t, a, i, n[c + 5], 12, 1200080426),
            i = h(i, o, t, a, n[c + 6], 17, -1473231341),
            a = h(a, i, o, t, n[c + 7], 22, -45705983),
            t = h(t, a, i, o, n[c + 8], 7, 1770035416),
            o = h(o, t, a, i, n[c + 9], 12, -1958414417),
            i = h(i, o, t, a, n[c + 10], 17, -42063),
            a = h(a, i, o, t, n[c + 11], 22, -1990404162),
            t = h(t, a, i, o, n[c + 12], 7, 1804603682),
            o = h(o, t, a, i, n[c + 13], 12, -40341101),
            i = h(i, o, t, a, n[c + 14], 17, -1502002290),
            a = h(a, i, o, t, n[c + 15], 22, 1236535329),
            t = m(t, a, i, o, n[c + 1], 5, -165796510),
            o = m(o, t, a, i, n[c + 6], 9, -1069501632),
            i = m(i, o, t, a, n[c + 11], 14, 643717713),
            a = m(a, i, o, t, n[c + 0], 20, -373897302),
            t = m(t, a, i, o, n[c + 5], 5, -701558691),
            o = m(o, t, a, i, n[c + 10], 9, 38016083),
            i = m(i, o, t, a, n[c + 15], 14, -660478335),
            a = m(a, i, o, t, n[c + 4], 20, -405537848),
            t = m(t, a, i, o, n[c + 9], 5, 568446438),
            o = m(o, t, a, i, n[c + 14], 9, -1019803690),
            i = m(i, o, t, a, n[c + 3], 14, -187363961),
            a = m(a, i, o, t, n[c + 8], 20, 1163531501),
            t = m(t, a, i, o, n[c + 13], 5, -1444681467),
            o = m(o, t, a, i, n[c + 2], 9, -51403784),
            i = m(i, o, t, a, n[c + 7], 14, 1735328473),
            a = m(a, i, o, t, n[c + 12], 20, -1926607734),
            t = A(t, a, i, o, n[c + 5], 4, -378558),
            o = A(o, t, a, i, n[c + 8], 11, -2022574463),
            i = A(i, o, t, a, n[c + 11], 16, 1839030562),
            a = A(a, i, o, t, n[c + 14], 23, -35309556),
            t = A(t, a, i, o, n[c + 1], 4, -1530992060),
            o = A(o, t, a, i, n[c + 4], 11, 1272893353),
            i = A(i, o, t, a, n[c + 7], 16, -155497632),
            a = A(a, i, o, t, n[c + 10], 23, -1094730640),
            t = A(t, a, i, o, n[c + 13], 4, 681279174),
            o = A(o, t, a, i, n[c + 0], 11, -358537222),
            i = A(i, o, t, a, n[c + 3], 16, -722521979),
            a = A(a, i, o, t, n[c + 6], 23, 76029189),
            t = A(t, a, i, o, n[c + 9], 4, -640364487),
            o = A(o, t, a, i, n[c + 12], 11, -421815835),
            i = A(i, o, t, a, n[c + 15], 16, 530742520),
            a = A(a, i, o, t, n[c + 2], 23, -995338651),
            t = p(t, a, i, o, n[c + 0], 6, -198630844),
            o = p(o, t, a, i, n[c + 7], 10, 1126891415),
            i = p(i, o, t, a, n[c + 14], 15, -1416354905),
            a = p(a, i, o, t, n[c + 5], 21, -57434055),
            t = p(t, a, i, o, n[c + 12], 6, 1700485571),
            o = p(o, t, a, i, n[c + 3], 10, -1894986606),
            i = p(i, o, t, a, n[c + 10], 15, -1051523),
            a = p(a, i, o, t, n[c + 1], 21, -2054922799),
            t = p(t, a, i, o, n[c + 8], 6, 1873313359),
            o = p(o, t, a, i, n[c + 15], 10, -30611744),
            i = p(i, o, t, a, n[c + 6], 15, -1560198380),
            a = p(a, i, o, t, n[c + 13], 21, 1309151649),
            t = p(t, a, i, o, n[c + 4], 6, -145523070),
            o = p(o, t, a, i, n[c + 11], 10, -1120210379),
            i = p(i, o, t, a, n[c + 2], 15, 718787259),
            a = p(a, i, o, t, n[c + 9], 21, -343485551),
            t = f(t, s),
            a = f(a, l),
            i = f(i, r),
            o = f(o, d)
    }
    return Array(t, a, i, o)
}

function h(n, e, t, a, i, o, c) {
    return u(e & t | ~e & a, n, e, i, o, c)
}

function u(n, e, t, a, i, o) {
    return f(g(f(f(e, n), f(a, o)), i), t)
}

function p(n, e, t, a, i, o, c) {
    return u(t ^ (e | ~a), n, e, i, o, c)
}

function f(n, e) {
    var t = (65535 & n) + (65535 & e)
        , a = (n >> 16) + (e >> 16) + (t >> 16);
    return a << 16 | 65535 & t
}

function A(n, e, t, a, i, o, c) {
    return u(e ^ t ^ a, n, e, i, o, c)
}

function g(n, e) {
    return n << e | n >>> 32 - e
}

function s(n) {
    var e, t, a = "", i = -1;
    while (++i < n.length)
        e = n.charCodeAt(i),
            t = i + 1 < n.length ? n.charCodeAt(i + 1) : 0,
        55296 <= e && e <= 56319 && 56320 <= t && t <= 57343 && (e = 65536 + ((1023 & e) << 10) + (1023 & t),
            i++),
            e <= 127 ? a += String.fromCharCode(e) : e <= 2047 ? a += String.fromCharCode(192 | e >>> 6 & 31, 128 | 63 & e) : e <= 65535 ? a += String.fromCharCode(224 | e >>> 12 & 15, 128 | e >>> 6 & 63, 128 | 63 & e) : e <= 2097151 && (a += String.fromCharCode(240 | e >>> 18 & 7, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | 63 & e));
    return a
}

function c(n) {
    for (var e, t = a ? "0123456789ABCDEF" : "0123456789abcdef", i = "", o = 0; o < n.length; o++)
        e = n.charCodeAt(o),
            i += t.charAt(e >>> 4 & 15) + t.charAt(15 & e);
    return i
}

function o(n) {
    return r(d(l(n), 8 * n.length))
}

function l(n) {
    for (var e = Array(n.length >> 2), t = 0; t < e.length; t++)
        e[t] = 0;
    for (t = 0; t < 8 * n.length; t += 8)
        e[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
    return e
}

function m(n, e, t, a, i, o, c) {
    return u(e & a | t & ~a, n, e, i, o, c)
}

function r(n) {
    for (var e = "", t = 0; t < 32 * n.length; t += 8)
        e += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
    return e
}

function get_sig(e) {
    return i(P(S(e)))
}