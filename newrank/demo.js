function b(a) {
    function b(a) {
        return d(c(e(a)))
    }

    function c(a) {
        return g(h(f(a), 8 * a.length))
    }

    function d(a) {
        for (var b, c = p ? "0123456789ABCDEF" : "0123456789abcdef", d = "", e = 0; e < a.length; e++)
            b = a.charCodeAt(e),
                d += c.charAt(b >>> 4 & 15) + c.charAt(15 & b);
        return d
    }

    function e(a) {
        for (var b, c, d = "", e = -1; ++e < a.length;)
            b = a.charCodeAt(e),
                c = e + 1 < a.length ? a.charCodeAt(e + 1) : 0,
            55296 <= b && b <= 56319 && 56320 <= c && c <= 57343 && (b = 65536 + ((1023 & b) << 10) + (1023 & c),
                e++),
                b <= 127 ? d += String.fromCharCode(b) : b <= 2047 ? d += String.fromCharCode(192 | b >>> 6 & 31, 128 | 63 & b) : b <= 65535 ? d += String.fromCharCode(224 | b >>> 12 & 15, 128 | b >>> 6 & 63, 128 | 63 & b) : b <= 2097151 && (d += String.fromCharCode(240 | b >>> 18 & 7, 128 | b >>> 12 & 63, 128 | b >>> 6 & 63, 128 | 63 & b));
        return d
    }

    function f(a) {
        for (var b = Array(a.length >> 2), c = 0; c < b.length; c++)
            b[c] = 0;
        for (var c = 0; c < 8 * a.length; c += 8)
            b[c >> 5] |= (255 & a.charCodeAt(c / 8)) << c % 32;
        return b
    }

    function g(a) {
        for (var b = "", c = 0; c < 32 * a.length; c += 8)
            b += String.fromCharCode(a[c >> 5] >>> c % 32 & 255);
        return b
    }

    function h(a, b) {
        a[b >> 5] |= 128 << b % 32,
            a[14 + (b + 64 >>> 9 << 4)] = b;
        for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
            var h = c
                , i = d
                , o = e
                , p = f;
            c = j(c, d, e, f, a[g + 0], 7, -680876936),
                f = j(f, c, d, e, a[g + 1], 12, -389564586),
                e = j(e, f, c, d, a[g + 2], 17, 606105819),
                d = j(d, e, f, c, a[g + 3], 22, -1044525330),
                c = j(c, d, e, f, a[g + 4], 7, -176418897),
                f = j(f, c, d, e, a[g + 5], 12, 1200080426),
                e = j(e, f, c, d, a[g + 6], 17, -1473231341),
                d = j(d, e, f, c, a[g + 7], 22, -45705983),
                c = j(c, d, e, f, a[g + 8], 7, 1770035416),
                f = j(f, c, d, e, a[g + 9], 12, -1958414417),
                e = j(e, f, c, d, a[g + 10], 17, -42063),
                d = j(d, e, f, c, a[g + 11], 22, -1990404162),
                c = j(c, d, e, f, a[g + 12], 7, 1804603682),
                f = j(f, c, d, e, a[g + 13], 12, -40341101),
                e = j(e, f, c, d, a[g + 14], 17, -1502002290),
                d = j(d, e, f, c, a[g + 15], 22, 1236535329),
                c = k(c, d, e, f, a[g + 1], 5, -165796510),
                f = k(f, c, d, e, a[g + 6], 9, -1069501632),
                e = k(e, f, c, d, a[g + 11], 14, 643717713),
                d = k(d, e, f, c, a[g + 0], 20, -373897302),
                c = k(c, d, e, f, a[g + 5], 5, -701558691),
                f = k(f, c, d, e, a[g + 10], 9, 38016083),
                e = k(e, f, c, d, a[g + 15], 14, -660478335),
                d = k(d, e, f, c, a[g + 4], 20, -405537848),
                c = k(c, d, e, f, a[g + 9], 5, 568446438),
                f = k(f, c, d, e, a[g + 14], 9, -1019803690),
                e = k(e, f, c, d, a[g + 3], 14, -187363961),
                d = k(d, e, f, c, a[g + 8], 20, 1163531501),
                c = k(c, d, e, f, a[g + 13], 5, -1444681467),
                f = k(f, c, d, e, a[g + 2], 9, -51403784),
                e = k(e, f, c, d, a[g + 7], 14, 1735328473),
                d = k(d, e, f, c, a[g + 12], 20, -1926607734),
                c = l(c, d, e, f, a[g + 5], 4, -378558),
                f = l(f, c, d, e, a[g + 8], 11, -2022574463),
                e = l(e, f, c, d, a[g + 11], 16, 1839030562),
                d = l(d, e, f, c, a[g + 14], 23, -35309556),
                c = l(c, d, e, f, a[g + 1], 4, -1530992060),
                f = l(f, c, d, e, a[g + 4], 11, 1272893353),
                e = l(e, f, c, d, a[g + 7], 16, -155497632),
                d = l(d, e, f, c, a[g + 10], 23, -1094730640),
                c = l(c, d, e, f, a[g + 13], 4, 681279174),
                f = l(f, c, d, e, a[g + 0], 11, -358537222),
                e = l(e, f, c, d, a[g + 3], 16, -722521979),
                d = l(d, e, f, c, a[g + 6], 23, 76029189),
                c = l(c, d, e, f, a[g + 9], 4, -640364487),
                f = l(f, c, d, e, a[g + 12], 11, -421815835),
                e = l(e, f, c, d, a[g + 15], 16, 530742520),
                d = l(d, e, f, c, a[g + 2], 23, -995338651),
                c = m(c, d, e, f, a[g + 0], 6, -198630844),
                f = m(f, c, d, e, a[g + 7], 10, 1126891415),
                e = m(e, f, c, d, a[g + 14], 15, -1416354905),
                d = m(d, e, f, c, a[g + 5], 21, -57434055),
                c = m(c, d, e, f, a[g + 12], 6, 1700485571),
                f = m(f, c, d, e, a[g + 3], 10, -1894986606),
                e = m(e, f, c, d, a[g + 10], 15, -1051523),
                d = m(d, e, f, c, a[g + 1], 21, -2054922799),
                c = m(c, d, e, f, a[g + 8], 6, 1873313359),
                f = m(f, c, d, e, a[g + 15], 10, -30611744),
                e = m(e, f, c, d, a[g + 6], 15, -1560198380),
                d = m(d, e, f, c, a[g + 13], 21, 1309151649),
                c = m(c, d, e, f, a[g + 4], 6, -145523070),
                f = m(f, c, d, e, a[g + 11], 10, -1120210379),
                e = m(e, f, c, d, a[g + 2], 15, 718787259),
                d = m(d, e, f, c, a[g + 9], 21, -343485551),
                c = n(c, h),
                d = n(d, i),
                e = n(e, o),
                f = n(f, p)
        }
        return Array(c, d, e, f)
    }

    function i(a, b, c, d, e, f) {
        return n(o(n(n(b, a), n(d, f)), e), c)
    }

    function j(a, b, c, d, e, f, g) {
        return i(b & c | ~b & d, a, b, e, f, g)
    }

    function k(a, b, c, d, e, f, g) {
        return i(b & d | c & ~d, a, b, e, f, g)
    }

    function l(a, b, c, d, e, f, g) {
        return i(b ^ c ^ d, a, b, e, f, g)
    }

    function m(a, b, c, d, e, f, g) {
        return i(c ^ (b | ~d), a, b, e, f, g)
    }

    function n(a, b) {
        var c = (65535 & a) + (65535 & b);
        return (a >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c
    }

    function o(a, b) {
        return a << b | a >>> 32 - b
    }

    var p = 0;
    return b(a)
}
