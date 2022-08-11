function wordsToBytes(t) {
    for (var e = [], n = 0; n < 32 * t.length; n += 8)
        e.push(t[n >>> 5] >>> 24 - n % 32 & 255);
    return e
}

function bytesToWords(t) {
    for (var e = [], n = 0, r = 0; n < t.length; n++,
        r += 8)
        e[r >>> 5] |= t[n] << 24 - r % 32;
    return e
}

function bytesToHex(t) {
    for (var e = [], n = 0; n < t.length; n++)
        e.push((t[n] >>> 4).toString(16)),
            e.push((15 & t[n]).toString(16));
    return e.join("")
}

function i_stringToBytes(t) {
    for (var e = [], n = 0; n < t.length; n++)
        e.push(255 & t.charCodeAt(n));
    return e
}

function r_stringToBytes(t) {
    return i_stringToBytes(unescape(encodeURIComponent(t)))
}

function _ff(t, e, n, r, o, i, a) {
    var u = t + (e & n | ~e & r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
}

function _gg(t, e, n, r, o, i, a) {
    var u = t + (e & r | n & ~r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
}

function _hh(t, e, n, r, o, i, a) {
    var u = t + (e ^ n ^ r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
}

function _ii(t, e, n, r, o, i, a) {
    var u = t + (n ^ (e | ~r)) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
}

function a(t, n) {
    t.constructor == String ? t = n && "binary" === n.encoding ? i_stringToBytes(t) : r_stringToBytes(t) : o(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || t.constructor === Uint8Array || (t = t.toString());
    for (var u = bytesToWords(t), c = 8 * t.length, s = 1732584193, f = -271733879, d = -1732584194, l = 271733878, p = 0; p < u.length; p++)
        u[p] = 16711935 & (u[p] << 8 | u[p] >>> 24) | 4278255360 & (u[p] << 24 | u[p] >>> 8);
    u[c >>> 5] |= 128 << c % 32,
        u[14 + (c + 64 >>> 9 << 4)] = c;
    var h = _ff
        , g = _gg
        , v = _hh
        , m = _ii;
    for (p = 0; p < u.length; p += 16) {
        var y = s
            , b = f
            , w = d
            , x = l;
        s = h(s, f, d, l, u[p + 0], 7, -680876936),
            l = h(l, s, f, d, u[p + 1], 12, -389564586),
            d = h(d, l, s, f, u[p + 2], 17, 606105819),
            f = h(f, d, l, s, u[p + 3], 22, -1044525330),
            s = h(s, f, d, l, u[p + 4], 7, -176418897),
            l = h(l, s, f, d, u[p + 5], 12, 1200080426),
            d = h(d, l, s, f, u[p + 6], 17, -1473231341),
            f = h(f, d, l, s, u[p + 7], 22, -45705983),
            s = h(s, f, d, l, u[p + 8], 7, 1770035416),
            l = h(l, s, f, d, u[p + 9], 12, -1958414417),
            d = h(d, l, s, f, u[p + 10], 17, -42063),
            f = h(f, d, l, s, u[p + 11], 22, -1990404162),
            s = h(s, f, d, l, u[p + 12], 7, 1804603682),
            l = h(l, s, f, d, u[p + 13], 12, -40341101),
            d = h(d, l, s, f, u[p + 14], 17, -1502002290),
            s = g(s, f = h(f, d, l, s, u[p + 15], 22, 1236535329), d, l, u[p + 1], 5, -165796510),
            l = g(l, s, f, d, u[p + 6], 9, -1069501632),
            d = g(d, l, s, f, u[p + 11], 14, 643717713),
            f = g(f, d, l, s, u[p + 0], 20, -373897302),
            s = g(s, f, d, l, u[p + 5], 5, -701558691),
            l = g(l, s, f, d, u[p + 10], 9, 38016083),
            d = g(d, l, s, f, u[p + 15], 14, -660478335),
            f = g(f, d, l, s, u[p + 4], 20, -405537848),
            s = g(s, f, d, l, u[p + 9], 5, 568446438),
            l = g(l, s, f, d, u[p + 14], 9, -1019803690),
            d = g(d, l, s, f, u[p + 3], 14, -187363961),
            f = g(f, d, l, s, u[p + 8], 20, 1163531501),
            s = g(s, f, d, l, u[p + 13], 5, -1444681467),
            l = g(l, s, f, d, u[p + 2], 9, -51403784),
            d = g(d, l, s, f, u[p + 7], 14, 1735328473),
            s = v(s, f = g(f, d, l, s, u[p + 12], 20, -1926607734), d, l, u[p + 5], 4, -378558),
            l = v(l, s, f, d, u[p + 8], 11, -2022574463),
            d = v(d, l, s, f, u[p + 11], 16, 1839030562),
            f = v(f, d, l, s, u[p + 14], 23, -35309556),
            s = v(s, f, d, l, u[p + 1], 4, -1530992060),
            l = v(l, s, f, d, u[p + 4], 11, 1272893353),
            d = v(d, l, s, f, u[p + 7], 16, -155497632),
            f = v(f, d, l, s, u[p + 10], 23, -1094730640),
            s = v(s, f, d, l, u[p + 13], 4, 681279174),
            l = v(l, s, f, d, u[p + 0], 11, -358537222),
            d = v(d, l, s, f, u[p + 3], 16, -722521979),
            f = v(f, d, l, s, u[p + 6], 23, 76029189),
            s = v(s, f, d, l, u[p + 9], 4, -640364487),
            l = v(l, s, f, d, u[p + 12], 11, -421815835),
            d = v(d, l, s, f, u[p + 15], 16, 530742520),
            s = m(s, f = v(f, d, l, s, u[p + 2], 23, -995338651), d, l, u[p + 0], 6, -198630844),
            l = m(l, s, f, d, u[p + 7], 10, 1126891415),
            d = m(d, l, s, f, u[p + 14], 15, -1416354905),
            f = m(f, d, l, s, u[p + 5], 21, -57434055),
            s = m(s, f, d, l, u[p + 12], 6, 1700485571),
            l = m(l, s, f, d, u[p + 3], 10, -1894986606),
            d = m(d, l, s, f, u[p + 10], 15, -1051523),
            f = m(f, d, l, s, u[p + 1], 21, -2054922799),
            s = m(s, f, d, l, u[p + 8], 6, 1873313359),
            l = m(l, s, f, d, u[p + 15], 10, -30611744),
            d = m(d, l, s, f, u[p + 6], 15, -1560198380),
            f = m(f, d, l, s, u[p + 13], 21, 1309151649),
            s = m(s, f, d, l, u[p + 4], 6, -145523070),
            l = m(l, s, f, d, u[p + 11], 10, -1120210379),
            d = m(d, l, s, f, u[p + 2], 15, 718787259),
            f = m(f, d, l, s, u[p + 9], 21, -343485551),
            s = s + y >>> 0,
            f = f + b >>> 0,
            d = d + w >>> 0,
            l = l + x >>> 0
    }
    return endian([s, f, d, l])
}

function rotl(t, e) {
    return t << e | t >>> 32 - e
}

function endian(t) {
    if (t.constructor == Number)
        return 16711935 & rotl(t, 8) | 4278255360 & rotl(t, 24);
    for (var e = 0; e < t.length; e++)
        t[e] = endian(t[e]);
    return t
}

function o(t, n) {
    var r = wordsToBytes(a(t, n));
    return bytesToHex(r)
}

function get_code(timestamp) {
    var n = timestamp.toString(),
        r = o(n + "9527" + n.substr(0, 6));
    return r
}
