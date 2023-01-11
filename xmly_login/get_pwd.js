window = global;
var navigator = {};

!function (t) {
    "use strict";

    function e(t) {
        return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)
    }

    function r(t, e) {
        return t & e
    }

    function n(t, e) {
        return t | e
    }

    function i(t, e) {
        return t ^ e
    }

    function o(t, e) {
        return t & ~e
    }

    function a(t) {
        if (0 == t)
            return -1;
        var e = 0;
        return 0 == (65535 & t) && (t >>= 16,
            e += 16),
        0 == (255 & t) && (t >>= 8,
            e += 8),
        0 == (15 & t) && (t >>= 4,
            e += 4),
        0 == (3 & t) && (t >>= 2,
            e += 2),
        0 == (1 & t) && ++e,
            e
    }

    function s(t) {
        for (var e = 0; 0 != t;)
            t &= t - 1,
                ++e;
        return e
    }

    var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function l(t) {
        var e, r, n = "";
        for (e = 0; e + 3 <= t.length; e += 3)
            r = parseInt(t.substring(e, e + 3), 16),
                n += u.charAt(r >> 6) + u.charAt(63 & r);
        for (e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16),
            n += u.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16),
            n += u.charAt(r >> 2) + u.charAt((3 & r) << 4)); (3 & n.length) > 0;)
            n += "=";
        return n
    }

    function c(t) {
        var r, n = "", i = 0, o = 0;
        for (r = 0; r < t.length && "=" != t.charAt(r); ++r) {
            var a = u.indexOf(t.charAt(r));
            a < 0 || (0 == i ? (n += e(a >> 2),
                o = 3 & a,
                i = 1) : 1 == i ? (n += e(o << 2 | a >> 4),
                o = 15 & a,
                i = 2) : 2 == i ? (n += e(o),
                n += e(a >> 2),
                o = 3 & a,
                i = 3) : (n += e(o << 2 | a >> 4),
                n += e(15 & a),
                i = 0))
        }
        return 1 == i && (n += e(o << 2)),
            n
    }

    var f, d, h = function (t, e) {
            return (h = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function (t, e) {
                        t.__proto__ = e
                    }
                    || function (t, e) {
                        for (var r in e)
                            e.hasOwnProperty(r) && (t[r] = e[r])
                    }
            )(t, e)
        }, p = function (t) {
            var e;
            if (void 0 === f) {
                var r = "0123456789ABCDEF";
                for (f = {},
                         e = 0; e < 16; ++e)
                    f[r.charAt(e)] = e;
                for (r = r.toLowerCase(),
                         e = 10; e < 16; ++e)
                    f[r.charAt(e)] = e;
                for (e = 0; e < " \f\n\r\t \u2028\u2029".length; ++e)
                    f[" \f\n\r\t \u2028\u2029".charAt(e)] = -1
            }
            var n = []
                , i = 0
                , o = 0;
            for (e = 0; e < t.length; ++e) {
                var a = t.charAt(e);
                if ("=" == a)
                    break;
                if (-1 != (a = f[a])) {
                    if (void 0 === a)
                        throw new Error("Illegal character at offset " + e);
                    i |= a,
                        ++o >= 2 ? (n[n.length] = i,
                            i = 0,
                            o = 0) : i <<= 4
                }
            }
            if (o)
                throw new Error("Hex encoding incomplete: 4 bits missing");
            return n
        }, g = {
            decode: function (t) {
                var e;
                if (void 0 === d) {
                    for (d = Object.create(null),
                             e = 0; e < 64; ++e)
                        d["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                    for (e = 0; e < "= \f\n\r\t \u2028\u2029".length; ++e)
                        d["= \f\n\r\t \u2028\u2029".charAt(e)] = -1
                }
                var r = []
                    , n = 0
                    , i = 0;
                for (e = 0; e < t.length; ++e) {
                    var o = t.charAt(e);
                    if ("=" == o)
                        break;
                    if (-1 != (o = d[o])) {
                        if (void 0 === o)
                            throw new Error("Illegal character at offset " + e);
                        n |= o,
                            ++i >= 4 ? (r[r.length] = n >> 16,
                                r[r.length] = n >> 8 & 255,
                                r[r.length] = 255 & n,
                                n = 0,
                                i = 0) : n <<= 6
                    }
                }
                switch (i) {
                    case 1:
                        throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                    case 2:
                        r[r.length] = n >> 10;
                        break;
                    case 3:
                        r[r.length] = n >> 16,
                            r[r.length] = n >> 8 & 255
                }
                return r
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function (t) {
                var e = g.re.exec(t);
                if (e)
                    if (e[1])
                        t = e[1];
                    else {
                        if (!e[2])
                            throw new Error("RegExp out of sync");
                        t = e[2]
                    }
                return g.decode(t)
            }
        }, v = 1e13, y = function () {
            function t(t) {
                this.buf = [+t || 0]
            }

            return t.prototype.mulAdd = function (t, e) {
                var r, n, i = this.buf, o = i.length;
                for (r = 0; r < o; ++r)
                    (n = i[r] * t + e) < v ? e = 0 : n -= (e = 0 | n / v) * v,
                        i[r] = n;
                e > 0 && (i[r] = e)
            }
                ,
                t.prototype.sub = function (t) {
                    var e, r, n = this.buf, i = n.length;
                    for (e = 0; e < i; ++e)
                        (r = n[e] - t) < 0 ? (r += v,
                            t = 1) : t = 0,
                            n[e] = r;
                    for (; 0 === n[n.length - 1];)
                        n.pop()
                }
                ,
                t.prototype.toString = function (t) {
                    if (10 != (t || 10))
                        throw new Error("only base 10 is supported");
                    for (var e = this.buf, r = e[e.length - 1].toString(), n = e.length - 2; n >= 0; --n)
                        r += (v + e[n]).toString().substring(1);
                    return r
                }
                ,
                t.prototype.valueOf = function () {
                    for (var t = this.buf, e = 0, r = t.length - 1; r >= 0; --r)
                        e = e * v + t[r];
                    return e
                }
                ,
                t.prototype.simplify = function () {
                    var t = this.buf;
                    return 1 == t.length ? t[0] : this
                }
                ,
                t
        }(),
        m = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
        b = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

    function E(t, e) {
        return t.length > e && (t = t.substring(0, e) + "…"),
            t
    }

    var T, w = function () {
            function t(e, r) {
                this.hexDigits = "0123456789ABCDEF",
                    e instanceof t ? (this.enc = e.enc,
                        this.pos = e.pos) : (this.enc = e,
                        this.pos = r)
            }

            return t.prototype.get = function (t) {
                if (void 0 === t && (t = this.pos++),
                t >= this.enc.length)
                    throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }
                ,
                t.prototype.hexByte = function (t) {
                    return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
                }
                ,
                t.prototype.hexDump = function (t, e, r) {
                    for (var n = "", i = t; i < e; ++i)
                        if (n += this.hexByte(this.get(i)),
                        !0 !== r)
                            switch (15 & i) {
                                case 7:
                                    n += "  ";
                                    break;
                                case 15:
                                    n += "\n";
                                    break;
                                default:
                                    n += " "
                            }
                    return n
                }
                ,
                t.prototype.isASCII = function (t, e) {
                    for (var r = t; r < e; ++r) {
                        var n = this.get(r);
                        if (n < 32 || n > 176)
                            return !1
                    }
                    return !0
                }
                ,
                t.prototype.parseStringISO = function (t, e) {
                    for (var r = "", n = t; n < e; ++n)
                        r += String.fromCharCode(this.get(n));
                    return r
                }
                ,
                t.prototype.parseStringUTF = function (t, e) {
                    for (var r = "", n = t; n < e;) {
                        var i = this.get(n++);
                        r += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(n++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(n++)) << 6 | 63 & this.get(n++))
                    }
                    return r
                }
                ,
                t.prototype.parseStringBMP = function (t, e) {
                    for (var r, n, i = "", o = t; o < e;)
                        r = this.get(o++),
                            n = this.get(o++),
                            i += String.fromCharCode(r << 8 | n);
                    return i
                }
                ,
                t.prototype.parseTime = function (t, e, r) {
                    var n = this.parseStringISO(t, e)
                        , i = (r ? m : b).exec(n);
                    return i ? (r && (i[1] = +i[1],
                        i[1] += +i[1] < 70 ? 2e3 : 1900),
                        n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
                    i[5] && (n += ":" + i[5],
                    i[6] && (n += ":" + i[6],
                    i[7] && (n += "." + i[7]))),
                    i[8] && (n += " UTC",
                    "Z" != i[8] && (n += i[8],
                    i[9] && (n += ":" + i[9]))),
                        n) : "Unrecognized time: " + n
                }
                ,
                t.prototype.parseInteger = function (t, e) {
                    for (var r, n = this.get(t), i = n > 127, o = i ? 255 : 0, a = ""; n == o && ++t < e;)
                        n = this.get(t);
                    if (0 == (r = e - t))
                        return i ? -1 : 0;
                    if (r > 4) {
                        for (a = n,
                                 r <<= 3; 0 == (128 & (+a ^ o));)
                            a = +a << 1,
                                --r;
                        a = "(" + r + " bit)\n"
                    }
                    i && (n -= 256);
                    for (var s = new y(n), u = t + 1; u < e; ++u)
                        s.mulAdd(256, this.get(u));
                    return a + s.toString()
                }
                ,
                t.prototype.parseBitString = function (t, e, r) {
                    for (var n = this.get(t), i = "(" + ((e - t - 1 << 3) - n) + " bit)\n", o = "", a = t + 1; a < e; ++a) {
                        for (var s = this.get(a), u = a == e - 1 ? n : 0, l = 7; l >= u; --l)
                            o += s >> l & 1 ? "1" : "0";
                        if (o.length > r)
                            return i + E(o, r)
                    }
                    return i + o
                }
                ,
                t.prototype.parseOctetString = function (t, e, r) {
                    if (this.isASCII(t, e))
                        return E(this.parseStringISO(t, e), r);
                    var n = e - t
                        , i = "(" + n + " byte)\n";
                    n > (r /= 2) && (e = t + r);
                    for (var o = t; o < e; ++o)
                        i += this.hexByte(this.get(o));
                    return n > r && (i += "…"),
                        i
                }
                ,
                t.prototype.parseOID = function (t, e, r) {
                    for (var n = "", i = new y, o = 0, a = t; a < e; ++a) {
                        var s = this.get(a);
                        if (i.mulAdd(128, 127 & s),
                            o += 7,
                            !(128 & s)) {
                            if ("" === n)
                                if ((i = i.simplify()) instanceof y)
                                    i.sub(80),
                                        n = "2." + i.toString();
                                else {
                                    var u = i < 80 ? i < 40 ? 0 : 1 : 2;
                                    n = u + "." + (i - 40 * u)
                                }
                            else
                                n += "." + i.toString();
                            if (n.length > r)
                                return E(n, r);
                            i = new y,
                                o = 0
                        }
                    }
                    return o > 0 && (n += ".incomplete"),
                        n
                }
                ,
                t
        }(), S = function () {
            function t(t, e, r, n, i) {
                if (!(n instanceof _))
                    throw new Error("Invalid tag value.");
                this.stream = t,
                    this.header = e,
                    this.length = r,
                    this.tag = n,
                    this.sub = i
            }

            return t.prototype.typeName = function () {
                switch (this.tag.tagClass) {
                    case 0:
                        switch (this.tag.tagNumber) {
                            case 0:
                                return "EOC";
                            case 1:
                                return "BOOLEAN";
                            case 2:
                                return "INTEGER";
                            case 3:
                                return "BIT_STRING";
                            case 4:
                                return "OCTET_STRING";
                            case 5:
                                return "NULL";
                            case 6:
                                return "OBJECT_IDENTIFIER";
                            case 7:
                                return "ObjectDescriptor";
                            case 8:
                                return "EXTERNAL";
                            case 9:
                                return "REAL";
                            case 10:
                                return "ENUMERATED";
                            case 11:
                                return "EMBEDDED_PDV";
                            case 12:
                                return "UTF8String";
                            case 16:
                                return "SEQUENCE";
                            case 17:
                                return "SET";
                            case 18:
                                return "NumericString";
                            case 19:
                                return "PrintableString";
                            case 20:
                                return "TeletexString";
                            case 21:
                                return "VideotexString";
                            case 22:
                                return "IA5String";
                            case 23:
                                return "UTCTime";
                            case 24:
                                return "GeneralizedTime";
                            case 25:
                                return "GraphicString";
                            case 26:
                                return "VisibleString";
                            case 27:
                                return "GeneralString";
                            case 28:
                                return "UniversalString";
                            case 30:
                                return "BMPString"
                        }
                        return "Universal_" + this.tag.tagNumber.toString();
                    case 1:
                        return "Application_" + this.tag.tagNumber.toString();
                    case 2:
                        return "[" + this.tag.tagNumber.toString() + "]";
                    case 3:
                        return "Private_" + this.tag.tagNumber.toString()
                }
            }
                ,
                t.prototype.content = function (t) {
                    if (void 0 === this.tag)
                        return null;
                    void 0 === t && (t = 1 / 0);
                    var e = this.posContent()
                        , r = Math.abs(this.length);
                    if (!this.tag.isUniversal())
                        return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                    switch (this.tag.tagNumber) {
                        case 1:
                            return 0 === this.stream.get(e) ? "false" : "true";
                        case 2:
                            return this.stream.parseInteger(e, e + r);
                        case 3:
                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + r, t);
                        case 4:
                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                        case 6:
                            return this.stream.parseOID(e, e + r, t);
                        case 16:
                        case 17:
                            return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                        case 12:
                            return E(this.stream.parseStringUTF(e, e + r), t);
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 26:
                            return E(this.stream.parseStringISO(e, e + r), t);
                        case 30:
                            return E(this.stream.parseStringBMP(e, e + r), t);
                        case 23:
                        case 24:
                            return this.stream.parseTime(e, e + r, 23 == this.tag.tagNumber)
                    }
                    return null
                }
                ,
                t.prototype.toString = function () {
                    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
                }
                ,
                t.prototype.toPrettyString = function (t) {
                    void 0 === t && (t = "");
                    var e = t + this.typeName() + " @" + this.stream.pos;
                    if (this.length >= 0 && (e += "+"),
                        e += this.length,
                        this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                        e += "\n",
                    null !== this.sub) {
                        t += "  ";
                        for (var r = 0, n = this.sub.length; r < n; ++r)
                            e += this.sub[r].toPrettyString(t)
                    }
                    return e
                }
                ,
                t.prototype.posStart = function () {
                    return this.stream.pos
                }
                ,
                t.prototype.posContent = function () {
                    return this.stream.pos + this.header
                }
                ,
                t.prototype.posEnd = function () {
                    return this.stream.pos + this.header + Math.abs(this.length)
                }
                ,
                t.prototype.toHexString = function () {
                    return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
                }
                ,
                t.decodeLength = function (t) {
                    var e = t.get()
                        , r = 127 & e;
                    if (r == e)
                        return r;
                    if (r > 6)
                        throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                    if (0 === r)
                        return null;
                    e = 0;
                    for (var n = 0; n < r; ++n)
                        e = 256 * e + t.get();
                    return e
                }
                ,
                t.prototype.getHexStringValue = function () {
                    var t = this.toHexString()
                        , e = 2 * this.header
                        , r = 2 * this.length;
                    return t.substr(e, r)
                }
                ,
                t.decode = function (e) {
                    var r;
                    r = e instanceof w ? e : new w(e, 0);
                    var n = new w(r)
                        , i = new _(r)
                        , o = t.decodeLength(r)
                        , a = r.pos
                        , s = a - n.pos
                        , u = null
                        , l = function () {
                        var e = [];
                        if (null !== o) {
                            for (var n = a + o; r.pos < n;)
                                e[e.length] = t.decode(r);
                            if (r.pos != n)
                                throw new Error("Content size is not correct for container starting at offset " + a)
                        } else
                            try {
                                for (; ;) {
                                    var i = t.decode(r);
                                    if (i.tag.isEOC())
                                        break;
                                    e[e.length] = i
                                }
                                o = a - r.pos
                            } catch (t) {
                                throw new Error("Exception while decoding undefined length content: " + t)
                            }
                        return e
                    };
                    if (i.tagConstructed)
                        u = l();
                    else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                        try {
                            if (3 == i.tagNumber && 0 != r.get())
                                throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                            u = l();
                            for (var c = 0; c < u.length; ++c)
                                if (u[c].tag.isEOC())
                                    throw new Error("EOC is not supposed to be actual content.")
                        } catch (t) {
                            u = null
                        }
                    if (null === u) {
                        if (null === o)
                            throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
                        r.pos = a + Math.abs(o)
                    }
                    return new t(n, s, o, i, u)
                }
                ,
                t
        }(), _ = function () {
            function t(t) {
                var e = t.get();
                if (this.tagClass = e >> 6,
                    this.tagConstructed = 0 != (32 & e),
                    this.tagNumber = 31 & e,
                31 == this.tagNumber) {
                    var r = new y;
                    do {
                        e = t.get(),
                            r.mulAdd(128, 127 & e)
                    } while (128 & e);
                    this.tagNumber = r.simplify()
                }
            }

            return t.prototype.isUniversal = function () {
                return 0 === this.tagClass
            }
                ,
                t.prototype.isEOC = function () {
                    return 0 === this.tagClass && 0 === this.tagNumber
                }
                ,
                t
        }(),
        x = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
        k = (1 << 26) / x[x.length - 1], A = function () {
            function t(t, e, r) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }

            return t.prototype.toString = function (t) {
                if (this.s < 0)
                    return "-" + this.negate().toString(t);
                var r;
                if (16 == t)
                    r = 4;
                else if (8 == t)
                    r = 3;
                else if (2 == t)
                    r = 1;
                else if (32 == t)
                    r = 5;
                else {
                    if (4 != t)
                        return this.toRadix(t);
                    r = 2
                }
                var n, i = (1 << r) - 1, o = !1, a = "", s = this.t, u = this.DB - s * this.DB % r;
                if (s-- > 0)
                    for (u < this.DB && (n = this[s] >> u) > 0 && (o = !0,
                        a = e(n)); s >= 0;)
                        u < r ? (n = (this[s] & (1 << u) - 1) << r - u,
                            n |= this[--s] >> (u += this.DB - r)) : (n = this[s] >> (u -= r) & i,
                        u <= 0 && (u += this.DB,
                            --s)),
                        n > 0 && (o = !0),
                        o && (a += e(n));
                return o ? a : "0"
            }
                ,
                t.prototype.negate = function () {
                    var e = D();
                    return t.ZERO.subTo(this, e),
                        e
                }
                ,
                t.prototype.abs = function () {
                    return this.s < 0 ? this.negate() : this
                }
                ,
                t.prototype.compareTo = function (t) {
                    var e = this.s - t.s;
                    if (0 != e)
                        return e;
                    var r = this.t;
                    if (0 != (e = r - t.t))
                        return this.s < 0 ? -e : e;
                    for (; --r >= 0;)
                        if (0 != (e = this[r] - t[r]))
                            return e;
                    return 0
                }
                ,
                t.prototype.bitLength = function () {
                    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + F(this[this.t - 1] ^ this.s & this.DM)
                }
                ,
                t.prototype.mod = function (e) {
                    var r = D();
                    return this.abs().divRemTo(e, null, r),
                    this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r),
                        r
                }
                ,
                t.prototype.modPowInt = function (t, e) {
                    var r;
                    return r = t < 256 || e.isEven() ? new P(e) : new C(e),
                        this.exp(t, r)
                }
                ,
                t.prototype.clone = function () {
                    var t = D();
                    return this.copyTo(t),
                        t
                }
                ,
                t.prototype.intValue = function () {
                    if (this.s < 0) {
                        if (1 == this.t)
                            return this[0] - this.DV;
                        if (0 == this.t)
                            return -1
                    } else {
                        if (1 == this.t)
                            return this[0];
                        if (0 == this.t)
                            return 0
                    }
                    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                }
                ,
                t.prototype.byteValue = function () {
                    return 0 == this.t ? this.s : this[0] << 24 >> 24
                }
                ,
                t.prototype.shortValue = function () {
                    return 0 == this.t ? this.s : this[0] << 16 >> 16
                }
                ,
                t.prototype.signum = function () {
                    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                }
                ,
                t.prototype.toByteArray = function () {
                    var t = this.t
                        , e = [];
                    e[0] = this.s;
                    var r, n = this.DB - t * this.DB % 8, i = 0;
                    if (t-- > 0)
                        for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[i++] = r | this.s << this.DB - n); t >= 0;)
                            n < 8 ? (r = (this[t] & (1 << n) - 1) << 8 - n,
                                r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255,
                            n <= 0 && (n += this.DB,
                                --t)),
                            0 != (128 & r) && (r |= -256),
                            0 == i && (128 & this.s) != (128 & r) && ++i,
                            (i > 0 || r != this.s) && (e[i++] = r);
                    return e
                }
                ,
                t.prototype.equals = function (t) {
                    return 0 == this.compareTo(t)
                }
                ,
                t.prototype.min = function (t) {
                    return this.compareTo(t) < 0 ? this : t
                }
                ,
                t.prototype.max = function (t) {
                    return this.compareTo(t) > 0 ? this : t
                }
                ,
                t.prototype.and = function (t) {
                    var e = D();
                    return this.bitwiseTo(t, r, e),
                        e
                }
                ,
                t.prototype.or = function (t) {
                    var e = D();
                    return this.bitwiseTo(t, n, e),
                        e
                }
                ,
                t.prototype.xor = function (t) {
                    var e = D();
                    return this.bitwiseTo(t, i, e),
                        e
                }
                ,
                t.prototype.andNot = function (t) {
                    var e = D();
                    return this.bitwiseTo(t, o, e),
                        e
                }
                ,
                t.prototype.not = function () {
                    for (var t = D(), e = 0; e < this.t; ++e)
                        t[e] = this.DM & ~this[e];
                    return t.t = this.t,
                        t.s = ~this.s,
                        t
                }
                ,
                t.prototype.shiftLeft = function (t) {
                    var e = D();
                    return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                        e
                }
                ,
                t.prototype.shiftRight = function (t) {
                    var e = D();
                    return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                        e
                }
                ,
                t.prototype.getLowestSetBit = function () {
                    for (var t = 0; t < this.t; ++t)
                        if (0 != this[t])
                            return t * this.DB + a(this[t]);
                    return this.s < 0 ? this.t * this.DB : -1
                }
                ,
                t.prototype.bitCount = function () {
                    for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
                        t += s(this[r] ^ e);
                    return t
                }
                ,
                t.prototype.testBit = function (t) {
                    var e = Math.floor(t / this.DB);
                    return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
                }
                ,
                t.prototype.setBit = function (t) {
                    return this.changeBit(t, n)
                }
                ,
                t.prototype.clearBit = function (t) {
                    return this.changeBit(t, o)
                }
                ,
                t.prototype.flipBit = function (t) {
                    return this.changeBit(t, i)
                }
                ,
                t.prototype.add = function (t) {
                    var e = D();
                    return this.addTo(t, e),
                        e
                }
                ,
                t.prototype.subtract = function (t) {
                    var e = D();
                    return this.subTo(t, e),
                        e
                }
                ,
                t.prototype.multiply = function (t) {
                    var e = D();
                    return this.multiplyTo(t, e),
                        e
                }
                ,
                t.prototype.divide = function (t) {
                    var e = D();
                    return this.divRemTo(t, e, null),
                        e
                }
                ,
                t.prototype.remainder = function (t) {
                    var e = D();
                    return this.divRemTo(t, null, e),
                        e
                }
                ,
                t.prototype.divideAndRemainder = function (t) {
                    var e = D()
                        , r = D();
                    return this.divRemTo(t, e, r),
                        [e, r]
                }
                ,
                t.prototype.modPow = function (t, e) {
                    var r, n, i = t.bitLength(), o = B(1);
                    if (i <= 0)
                        return o;
                    r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                        n = i < 8 ? new P(e) : e.isEven() ? new R(e) : new C(e);
                    var a = []
                        , s = 3
                        , u = r - 1
                        , l = (1 << r) - 1;
                    if (a[1] = n.convert(this),
                    r > 1) {
                        var c = D();
                        for (n.sqrTo(a[1], c); s <= l;)
                            a[s] = D(),
                                n.mulTo(c, a[s - 2], a[s]),
                                s += 2
                    }
                    var f, d, h = t.t - 1, p = !0, g = D();
                    for (i = F(t[h]) - 1; h >= 0;) {
                        for (i >= u ? f = t[h] >> i - u & l : (f = (t[h] & (1 << i + 1) - 1) << u - i,
                        h > 0 && (f |= t[h - 1] >> this.DB + i - u)),
                                 s = r; 0 == (1 & f);)
                            f >>= 1,
                                --s;
                        if ((i -= s) < 0 && (i += this.DB,
                            --h),
                            p)
                            a[f].copyTo(o),
                                p = !1;
                        else {
                            for (; s > 1;)
                                n.sqrTo(o, g),
                                    n.sqrTo(g, o),
                                    s -= 2;
                            s > 0 ? n.sqrTo(o, g) : (d = o,
                                o = g,
                                g = d),
                                n.mulTo(g, a[f], o)
                        }
                        for (; h >= 0 && 0 == (t[h] & 1 << i);)
                            n.sqrTo(o, g),
                                d = o,
                                o = g,
                                g = d,
                            --i < 0 && (i = this.DB - 1,
                                --h)
                    }
                    return n.revert(o)
                }
                ,
                t.prototype.modInverse = function (e) {
                    var r = e.isEven();
                    if (this.isEven() && r || 0 == e.signum())
                        return t.ZERO;
                    for (var n = e.clone(), i = this.clone(), o = B(1), a = B(0), s = B(0), u = B(1); 0 != n.signum();) {
                        for (; n.isEven();)
                            n.rShiftTo(1, n),
                                r ? (o.isEven() && a.isEven() || (o.addTo(this, o),
                                    a.subTo(e, a)),
                                    o.rShiftTo(1, o)) : a.isEven() || a.subTo(e, a),
                                a.rShiftTo(1, a);
                        for (; i.isEven();)
                            i.rShiftTo(1, i),
                                r ? (s.isEven() && u.isEven() || (s.addTo(this, s),
                                    u.subTo(e, u)),
                                    s.rShiftTo(1, s)) : u.isEven() || u.subTo(e, u),
                                u.rShiftTo(1, u);
                        n.compareTo(i) >= 0 ? (n.subTo(i, n),
                        r && o.subTo(s, o),
                            a.subTo(u, a)) : (i.subTo(n, i),
                        r && s.subTo(o, s),
                            u.subTo(a, u))
                    }
                    return 0 != i.compareTo(t.ONE) ? t.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u),
                        u.signum() < 0 ? u.add(e) : u) : u
                }
                ,
                t.prototype.pow = function (t) {
                    return this.exp(t, new O)
                }
                ,
                t.prototype.gcd = function (t) {
                    var e = this.s < 0 ? this.negate() : this.clone()
                        , r = t.s < 0 ? t.negate() : t.clone();
                    if (e.compareTo(r) < 0) {
                        var n = e;
                        e = r,
                            r = n
                    }
                    var i = e.getLowestSetBit()
                        , o = r.getLowestSetBit();
                    if (o < 0)
                        return e;
                    for (i < o && (o = i),
                         o > 0 && (e.rShiftTo(o, e),
                             r.rShiftTo(o, r)); e.signum() > 0;)
                        (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                        (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                            e.compareTo(r) >= 0 ? (e.subTo(r, e),
                                e.rShiftTo(1, e)) : (r.subTo(e, r),
                                r.rShiftTo(1, r));
                    return o > 0 && r.lShiftTo(o, r),
                        r
                }
                ,
                t.prototype.isProbablePrime = function (t) {
                    var e, r = this.abs();
                    if (1 == r.t && r[0] <= x[x.length - 1]) {
                        for (e = 0; e < x.length; ++e)
                            if (r[0] == x[e])
                                return !0;
                        return !1
                    }
                    if (r.isEven())
                        return !1;
                    for (e = 1; e < x.length;) {
                        for (var n = x[e], i = e + 1; i < x.length && n < k;)
                            n *= x[i++];
                        for (n = r.modInt(n); e < i;)
                            if (n % x[e++] == 0)
                                return !1
                    }
                    return r.millerRabin(t)
                }
                ,
                t.prototype.copyTo = function (t) {
                    for (var e = this.t - 1; e >= 0; --e)
                        t[e] = this[e];
                    t.t = this.t,
                        t.s = this.s
                }
                ,
                t.prototype.fromInt = function (t) {
                    this.t = 1,
                        this.s = t < 0 ? -1 : 0,
                        t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
                }
                ,
                t.prototype.fromString = function (e, r) {
                    var n;
                    if (16 == r)
                        n = 4;
                    else if (8 == r)
                        n = 3;
                    else if (256 == r)
                        n = 8;
                    else if (2 == r)
                        n = 1;
                    else if (32 == r)
                        n = 5;
                    else {
                        if (4 != r)
                            return void this.fromRadix(e, r);
                        n = 2
                    }
                    this.t = 0,
                        this.s = 0;
                    for (var i = e.length, o = !1, a = 0; --i >= 0;) {
                        var s = 8 == n ? 255 & +e[i] : j(e, i);
                        s < 0 ? "-" == e.charAt(i) && (o = !0) : (o = !1,
                            0 == a ? this[this.t++] = s : a + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a,
                                this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a,
                        (a += n) >= this.DB && (a -= this.DB))
                    }
                    8 == n && 0 != (128 & +e[0]) && (this.s = -1,
                    a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
                        this.clamp(),
                    o && t.ZERO.subTo(this, this)
                }
                ,
                t.prototype.clamp = function () {
                    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)
                        --this.t
                }
                ,
                t.prototype.dlShiftTo = function (t, e) {
                    var r;
                    for (r = this.t - 1; r >= 0; --r)
                        e[r + t] = this[r];
                    for (r = t - 1; r >= 0; --r)
                        e[r] = 0;
                    e.t = this.t + t,
                        e.s = this.s
                }
                ,
                t.prototype.drShiftTo = function (t, e) {
                    for (var r = t; r < this.t; ++r)
                        e[r - t] = this[r];
                    e.t = Math.max(this.t - t, 0),
                        e.s = this.s
                }
                ,
                t.prototype.lShiftTo = function (t, e) {
                    for (var r = t % this.DB, n = this.DB - r, i = (1 << n) - 1, o = Math.floor(t / this.DB), a = this.s << r & this.DM, s = this.t - 1; s >= 0; --s)
                        e[s + o + 1] = this[s] >> n | a,
                            a = (this[s] & i) << r;
                    for (s = o - 1; s >= 0; --s)
                        e[s] = 0;
                    e[o] = a,
                        e.t = this.t + o + 1,
                        e.s = this.s,
                        e.clamp()
                }
                ,
                t.prototype.rShiftTo = function (t, e) {
                    e.s = this.s;
                    var r = Math.floor(t / this.DB);
                    if (r >= this.t)
                        e.t = 0;
                    else {
                        var n = t % this.DB
                            , i = this.DB - n
                            , o = (1 << n) - 1;
                        e[0] = this[r] >> n;
                        for (var a = r + 1; a < this.t; ++a)
                            e[a - r - 1] |= (this[a] & o) << i,
                                e[a - r] = this[a] >> n;
                        n > 0 && (e[this.t - r - 1] |= (this.s & o) << i),
                            e.t = this.t - r,
                            e.clamp()
                    }
                }
                ,
                t.prototype.subTo = function (t, e) {
                    for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                        n += this[r] - t[r],
                            e[r++] = n & this.DM,
                            n >>= this.DB;
                    if (t.t < this.t) {
                        for (n -= t.s; r < this.t;)
                            n += this[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += this.s
                    } else {
                        for (n += this.s; r < t.t;)
                            n -= t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n -= t.s
                    }
                    e.s = n < 0 ? -1 : 0,
                        n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n),
                        e.t = r,
                        e.clamp()
                }
                ,
                t.prototype.multiplyTo = function (e, r) {
                    var n = this.abs()
                        , i = e.abs()
                        , o = n.t;
                    for (r.t = o + i.t; --o >= 0;)
                        r[o] = 0;
                    for (o = 0; o < i.t; ++o)
                        r[o + n.t] = n.am(0, i[o], r, o, 0, n.t);
                    r.s = 0,
                        r.clamp(),
                    this.s != e.s && t.ZERO.subTo(r, r)
                }
                ,
                t.prototype.squareTo = function (t) {
                    for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;)
                        t[r] = 0;
                    for (r = 0; r < e.t - 1; ++r) {
                        var n = e.am(r, e[r], t, 2 * r, 0, 1);
                        (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV,
                            t[r + e.t + 1] = 1)
                    }
                    t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)),
                        t.s = 0,
                        t.clamp()
                }
                ,
                t.prototype.divRemTo = function (e, r, n) {
                    var i = e.abs();
                    if (!(i.t <= 0)) {
                        var o = this.abs();
                        if (o.t < i.t)
                            return null != r && r.fromInt(0),
                                void (null != n && this.copyTo(n));
                        null == n && (n = D());
                        var a = D()
                            , s = this.s
                            , u = e.s
                            , l = this.DB - F(i[i.t - 1]);
                        l > 0 ? (i.lShiftTo(l, a),
                            o.lShiftTo(l, n)) : (i.copyTo(a),
                            o.copyTo(n));
                        var c = a.t
                            , f = a[c - 1];
                        if (0 != f) {
                            var d = f * (1 << this.F1) + (c > 1 ? a[c - 2] >> this.F2 : 0)
                                , h = this.FV / d
                                , p = (1 << this.F1) / d
                                , g = 1 << this.F2
                                , v = n.t
                                , y = v - c
                                , m = null == r ? D() : r;
                            for (a.dlShiftTo(y, m),
                                 n.compareTo(m) >= 0 && (n[n.t++] = 1,
                                     n.subTo(m, n)),
                                     t.ONE.dlShiftTo(c, m),
                                     m.subTo(a, a); a.t < c;)
                                a[a.t++] = 0;
                            for (; --y >= 0;) {
                                var b = n[--v] == f ? this.DM : Math.floor(n[v] * h + (n[v - 1] + g) * p);
                                if ((n[v] += a.am(0, b, n, y, 0, c)) < b)
                                    for (a.dlShiftTo(y, m),
                                             n.subTo(m, n); n[v] < --b;)
                                        n.subTo(m, n)
                            }
                            null != r && (n.drShiftTo(c, r),
                            s != u && t.ZERO.subTo(r, r)),
                                n.t = c,
                                n.clamp(),
                            l > 0 && n.rShiftTo(l, n),
                            s < 0 && t.ZERO.subTo(n, n)
                        }
                    }
                }
                ,
                t.prototype.invDigit = function () {
                    if (this.t < 1)
                        return 0;
                    var t = this[0];
                    if (0 == (1 & t))
                        return 0;
                    var e = 3 & t;
                    return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
                }
                ,
                t.prototype.isEven = function () {
                    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                }
                ,
                t.prototype.exp = function (e, r) {
                    if (e > 4294967295 || e < 1)
                        return t.ONE;
                    var n = D()
                        , i = D()
                        , o = r.convert(this)
                        , a = F(e) - 1;
                    for (o.copyTo(n); --a >= 0;)
                        if (r.sqrTo(n, i),
                        (e & 1 << a) > 0)
                            r.mulTo(i, o, n);
                        else {
                            var s = n;
                            n = i,
                                i = s
                        }
                    return r.revert(n)
                }
                ,
                t.prototype.chunkSize = function (t) {
                    return Math.floor(Math.LN2 * this.DB / Math.log(t))
                }
                ,
                t.prototype.toRadix = function (t) {
                    if (null == t && (t = 10),
                    0 == this.signum() || t < 2 || t > 36)
                        return "0";
                    var e = this.chunkSize(t)
                        , r = Math.pow(t, e)
                        , n = B(r)
                        , i = D()
                        , o = D()
                        , a = "";
                    for (this.divRemTo(n, i, o); i.signum() > 0;)
                        a = (r + o.intValue()).toString(t).substr(1) + a,
                            i.divRemTo(n, i, o);
                    return o.intValue().toString(t) + a
                }
                ,
                t.prototype.fromRadix = function (e, r) {
                    this.fromInt(0),
                    null == r && (r = 10);
                    for (var n = this.chunkSize(r), i = Math.pow(r, n), o = !1, a = 0, s = 0, u = 0; u < e.length; ++u) {
                        var l = j(e, u);
                        l < 0 ? "-" == e.charAt(u) && 0 == this.signum() && (o = !0) : (s = r * s + l,
                        ++a >= n && (this.dMultiply(i),
                            this.dAddOffset(s, 0),
                            a = 0,
                            s = 0))
                    }
                    a > 0 && (this.dMultiply(Math.pow(r, a)),
                        this.dAddOffset(s, 0)),
                    o && t.ZERO.subTo(this, this)
                }
                ,
                t.prototype.fromNumber = function (e, r, i) {
                    if ("number" == typeof r)
                        if (e < 2)
                            this.fromInt(1);
                        else
                            for (this.fromNumber(e, i),
                                 this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), n, this),
                                 this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r);)
                                this.dAddOffset(2, 0),
                                this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
                    else {
                        var o = []
                            , a = 7 & e;
                        o.length = 1 + (e >> 3),
                            r.nextBytes(o),
                            a > 0 ? o[0] &= (1 << a) - 1 : o[0] = 0,
                            this.fromString(o, 256)
                    }
                }
                ,
                t.prototype.bitwiseTo = function (t, e, r) {
                    var n, i, o = Math.min(t.t, this.t);
                    for (n = 0; n < o; ++n)
                        r[n] = e(this[n], t[n]);
                    if (t.t < this.t) {
                        for (i = t.s & this.DM,
                                 n = o; n < this.t; ++n)
                            r[n] = e(this[n], i);
                        r.t = this.t
                    } else {
                        for (i = this.s & this.DM,
                                 n = o; n < t.t; ++n)
                            r[n] = e(i, t[n]);
                        r.t = t.t
                    }
                    r.s = e(this.s, t.s),
                        r.clamp()
                }
                ,
                t.prototype.changeBit = function (e, r) {
                    var n = t.ONE.shiftLeft(e);
                    return this.bitwiseTo(n, r, n),
                        n
                }
                ,
                t.prototype.addTo = function (t, e) {
                    for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                        n += this[r] + t[r],
                            e[r++] = n & this.DM,
                            n >>= this.DB;
                    if (t.t < this.t) {
                        for (n += t.s; r < this.t;)
                            n += this[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += this.s
                    } else {
                        for (n += this.s; r < t.t;)
                            n += t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += t.s
                    }
                    e.s = n < 0 ? -1 : 0,
                        n > 0 ? e[r++] = n : n < -1 && (e[r++] = this.DV + n),
                        e.t = r,
                        e.clamp()
                }
                ,
                t.prototype.dMultiply = function (t) {
                    this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                        ++this.t,
                        this.clamp()
                }
                ,
                t.prototype.dAddOffset = function (t, e) {
                    if (0 != t) {
                        for (; this.t <= e;)
                            this[this.t++] = 0;
                        for (this[e] += t; this[e] >= this.DV;)
                            this[e] -= this.DV,
                            ++e >= this.t && (this[this.t++] = 0),
                                ++this[e]
                    }
                }
                ,
                t.prototype.multiplyLowerTo = function (t, e, r) {
                    var n = Math.min(this.t + t.t, e);
                    for (r.s = 0,
                             r.t = n; n > 0;)
                        r[--n] = 0;
                    for (var i = r.t - this.t; n < i; ++n)
                        r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
                    for (i = Math.min(t.t, e); n < i; ++n)
                        this.am(0, t[n], r, n, 0, e - n);
                    r.clamp()
                }
                ,
                t.prototype.multiplyUpperTo = function (t, e, r) {
                    --e;
                    var n = r.t = this.t + t.t - e;
                    for (r.s = 0; --n >= 0;)
                        r[n] = 0;
                    for (n = Math.max(e - this.t, 0); n < t.t; ++n)
                        r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
                    r.clamp(),
                        r.drShiftTo(1, r)
                }
                ,
                t.prototype.modInt = function (t) {
                    if (t <= 0)
                        return 0;
                    var e = this.DV % t
                        , r = this.s < 0 ? t - 1 : 0;
                    if (this.t > 0)
                        if (0 == e)
                            r = this[0] % t;
                        else
                            for (var n = this.t - 1; n >= 0; --n)
                                r = (e * r + this[n]) % t;
                    return r
                }
                ,
                t.prototype.millerRabin = function (e) {
                    var r = this.subtract(t.ONE)
                        , n = r.getLowestSetBit();
                    if (n <= 0)
                        return !1;
                    var i = r.shiftRight(n);
                    (e = e + 1 >> 1) > x.length && (e = x.length);
                    for (var o = D(), a = 0; a < e; ++a) {
                        o.fromInt(x[Math.floor(Math.random() * x.length)]);
                        var s = o.modPow(i, this);
                        if (0 != s.compareTo(t.ONE) && 0 != s.compareTo(r)) {
                            for (var u = 1; u++ < n && 0 != s.compareTo(r);)
                                if (0 == (s = s.modPowInt(2, this)).compareTo(t.ONE))
                                    return !1;
                            if (0 != s.compareTo(r))
                                return !1
                        }
                    }
                    return !0
                }
                ,
                t.prototype.square = function () {
                    var t = D();
                    return this.squareTo(t),
                        t
                }
                ,
                t.prototype.gcda = function (t, e) {
                    var r = this.s < 0 ? this.negate() : this.clone()
                        , n = t.s < 0 ? t.negate() : t.clone();
                    if (r.compareTo(n) < 0) {
                        var i = r;
                        r = n,
                            n = i
                    }
                    var o = r.getLowestSetBit()
                        , a = n.getLowestSetBit();
                    if (a < 0)
                        e(r);
                    else {
                        o < a && (a = o),
                        a > 0 && (r.rShiftTo(a, r),
                            n.rShiftTo(a, n));
                        var s = function () {
                            (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r),
                            (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                                r.compareTo(n) >= 0 ? (r.subTo(n, r),
                                    r.rShiftTo(1, r)) : (n.subTo(r, n),
                                    n.rShiftTo(1, n)),
                                r.signum() > 0 ? setTimeout(s, 0) : (a > 0 && n.lShiftTo(a, n),
                                    setTimeout((function () {
                                            e(n)
                                        }
                                    ), 0))
                        };
                        setTimeout(s, 10)
                    }
                }
                ,
                t.prototype.fromNumberAsync = function (e, r, i, o) {
                    if ("number" == typeof r)
                        if (e < 2)
                            this.fromInt(1);
                        else {
                            this.fromNumber(e, i),
                            this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), n, this),
                            this.isEven() && this.dAddOffset(1, 0);
                            var a = this
                                , s = function () {
                                a.dAddOffset(2, 0),
                                a.bitLength() > e && a.subTo(t.ONE.shiftLeft(e - 1), a),
                                    a.isProbablePrime(r) ? setTimeout((function () {
                                            o()
                                        }
                                    ), 0) : setTimeout(s, 0)
                            };
                            setTimeout(s, 0)
                        }
                    else {
                        var u = []
                            , l = 7 & e;
                        u.length = 1 + (e >> 3),
                            r.nextBytes(u),
                            l > 0 ? u[0] &= (1 << l) - 1 : u[0] = 0,
                            this.fromString(u, 256)
                    }
                }
                ,
                t
        }(), O = function () {
            function t() {
            }

            return t.prototype.convert = function (t) {
                return t
            }
                ,
                t.prototype.revert = function (t) {
                    return t
                }
                ,
                t.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e)
                }
                ,
                t
        }(), P = function () {
            function t(t) {
                this.m = t
            }

            return t.prototype.convert = function (t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
                ,
                t.prototype.revert = function (t) {
                    return t
                }
                ,
                t.prototype.reduce = function (t) {
                    t.divRemTo(this.m, null, t)
                }
                ,
                t.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                t
        }(), C = function () {
            function t(t) {
                this.m = t,
                    this.mp = t.invDigit(),
                    this.mpl = 32767 & this.mp,
                    this.mph = this.mp >> 15,
                    this.um = (1 << t.DB - 15) - 1,
                    this.mt2 = 2 * t.t
            }

            return t.prototype.convert = function (t) {
                var e = D();
                return t.abs().dlShiftTo(this.m.t, e),
                    e.divRemTo(this.m, null, e),
                t.s < 0 && e.compareTo(A.ZERO) > 0 && this.m.subTo(e, e),
                    e
            }
                ,
                t.prototype.revert = function (t) {
                    var e = D();
                    return t.copyTo(e),
                        this.reduce(e),
                        e
                }
                ,
                t.prototype.reduce = function (t) {
                    for (; t.t <= this.mt2;)
                        t[t.t++] = 0;
                    for (var e = 0; e < this.m.t; ++e) {
                        var r = 32767 & t[e]
                            , n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                        for (t[r = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV;)
                            t[r] -= t.DV,
                                t[++r]++
                    }
                    t.clamp(),
                        t.drShiftTo(this.m.t, t),
                    t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
                }
                ,
                t.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                t
        }(), R = function () {
            function t(t) {
                this.m = t,
                    this.r2 = D(),
                    this.q3 = D(),
                    A.ONE.dlShiftTo(2 * t.t, this.r2),
                    this.mu = this.r2.divide(t)
            }

            return t.prototype.convert = function (t) {
                if (t.s < 0 || t.t > 2 * this.m.t)
                    return t.mod(this.m);
                if (t.compareTo(this.m) < 0)
                    return t;
                var e = D();
                return t.copyTo(e),
                    this.reduce(e),
                    e
            }
                ,
                t.prototype.revert = function (t) {
                    return t
                }
                ,
                t.prototype.reduce = function (t) {
                    for (t.drShiftTo(this.m.t - 1, this.r2),
                         t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                             t.clamp()),
                             this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                             this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;)
                        t.dAddOffset(1, this.m.t + 1);
                    for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;)
                        t.subTo(this.m, t)
                }
                ,
                t.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                t
        }();

    function D() {
        return new A(null)
    }

    function L(t, e) {
        return new A(t, e)
    }

    "Microsoft Internet Explorer" == navigator.appName ? (A.prototype.am = function (t, e, r, n, i, o) {
        for (var a = 32767 & e, s = e >> 15; --o >= 0;) {
            var u = 32767 & this[t]
                , l = this[t++] >> 15
                , c = s * u + l * a;
            i = ((u = a * u + ((32767 & c) << 15) + r[n] + (1073741823 & i)) >>> 30) + (c >>> 15) + s * l + (i >>> 30),
                r[n++] = 1073741823 & u
        }
        return i
    }
        ,
        T = 30) : "Netscape" != navigator.appName ? (A.prototype.am = function (t, e, r, n, i, o) {
        for (; --o >= 0;) {
            var a = e * this[t++] + r[n] + i;
            i = Math.floor(a / 67108864),
                r[n++] = 67108863 & a
        }
        return i
    }
        ,
        T = 26) : (A.prototype.am = function (t, e, r, n, i, o) {
        for (var a = 16383 & e, s = e >> 14; --o >= 0;) {
            var u = 16383 & this[t]
                , l = this[t++] >> 14
                , c = s * u + l * a;
            i = ((u = a * u + ((16383 & c) << 14) + r[n] + i) >> 28) + (c >> 14) + s * l,
                r[n++] = 268435455 & u
        }
        return i
    }
        ,
        T = 28),
        A.prototype.DB = T,
        A.prototype.DM = (1 << T) - 1,
        A.prototype.DV = 1 << T,
        A.prototype.FV = Math.pow(2, 52),
        A.prototype.F1 = 52 - T,
        A.prototype.F2 = 2 * T - 52;
    var I, M, N = [];
    for (I = "0".charCodeAt(0),
             M = 0; M <= 9; ++M)
        N[I++] = M;
    for (I = "a".charCodeAt(0),
             M = 10; M < 36; ++M)
        N[I++] = M;
    for (I = "A".charCodeAt(0),
             M = 10; M < 36; ++M)
        N[I++] = M;

    function j(t, e) {
        var r = N[t.charCodeAt(e)];
        return null == r ? -1 : r
    }

    function B(t) {
        var e = D();
        return e.fromInt(t),
            e
    }

    function F(t) {
        var e, r = 1;
        return 0 != (e = t >>> 16) && (t = e,
            r += 16),
        0 != (e = t >> 8) && (t = e,
            r += 8),
        0 != (e = t >> 4) && (t = e,
            r += 4),
        0 != (e = t >> 2) && (t = e,
            r += 2),
        0 != (e = t >> 1) && (t = e,
            r += 1),
            r
    }

    A.ZERO = B(0),
        A.ONE = B(1);
    var U, H, V = function () {
        function t() {
            this.i = 0,
                this.j = 0,
                this.S = []
        }

        return t.prototype.init = function (t) {
            var e, r, n;
            for (e = 0; e < 256; ++e)
                this.S[e] = e;
            for (r = 0,
                     e = 0; e < 256; ++e)
                r = r + this.S[e] + t[e % t.length] & 255,
                    n = this.S[e],
                    this.S[e] = this.S[r],
                    this.S[r] = n;
            this.i = 0,
                this.j = 0
        }
            ,
            t.prototype.next = function () {
                var t;
                return this.i = this.i + 1 & 255,
                    this.j = this.j + this.S[this.i] & 255,
                    t = this.S[this.i],
                    this.S[this.i] = this.S[this.j],
                    this.S[this.j] = t,
                    this.S[t + this.S[this.i] & 255]
            }
            ,
            t
    }(), z = null;
    if (null == z) {
        z = [],
            H = 0;
        var G = void 0;
        if (window.crypto && window.crypto.getRandomValues) {
            var W = new Uint32Array(256);
            for (window.crypto.getRandomValues(W),
                     G = 0; G < W.length; ++G)
                z[H++] = 255 & W[G]
        }
        var K = function (t) {
            if (this.count = this.count || 0,
            this.count >= 256 || H >= 256)
                window.removeEventListener ? window.removeEventListener("mousemove", K, !1) : window.detachEvent && window.detachEvent("onmousemove", K);
            else
                try {
                    var e = t.x + t.y;
                    z[H++] = 255 & e,
                        this.count += 1
                } catch (t) {
                }
        };
        window.addEventListener ? window.addEventListener("mousemove", K, !1) : window.attachEvent && window.attachEvent("onmousemove", K)
    }

    function Y() {
        if (null == U) {
            for (U = new V; H < 256;) {
                var t = Math.floor(65536 * Math.random());
                z[H++] = 255 & t
            }
            for (U.init(z),
                     H = 0; H < z.length; ++H)
                z[H] = 0;
            H = 0
        }
        return U.next()
    }

    var X = function () {
        function t() {
        }

        return t.prototype.nextBytes = function (t) {
            for (var e = 0; e < t.length; ++e)
                t[e] = Y()
        }
            ,
            t
    }()
        , q = function () {
        function t() {
            this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
        }

        return t.prototype.doPublic = function (t) {
            return t.modPowInt(this.e, this.n)
        }
            ,
            t.prototype.doPrivate = function (t) {
                if (null == this.p || null == this.q)
                    return t.modPow(this.d, this.n);
                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(r) < 0;)
                    e = e.add(this.p);
                return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
            }
            ,
            t.prototype.setPublic = function (t, e) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = L(t, 16),
                    this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
            }
            ,
            t.prototype.encrypt = function (t) {
                var e = function (t, e) {
                    if (e < t.length + 11)
                        return console.error("Message too long for RSA"),
                            null;
                    for (var r = [], n = t.length - 1; n >= 0 && e > 0;) {
                        var i = t.charCodeAt(n--);
                        i < 128 ? r[--e] = i : i > 127 && i < 2048 ? (r[--e] = 63 & i | 128,
                            r[--e] = i >> 6 | 192) : (r[--e] = 63 & i | 128,
                            r[--e] = i >> 6 & 63 | 128,
                            r[--e] = i >> 12 | 224)
                    }
                    r[--e] = 0;
                    for (var o = new X, a = []; e > 2;) {
                        for (a[0] = 0; 0 == a[0];)
                            o.nextBytes(a);
                        r[--e] = a[0]
                    }
                    return r[--e] = 2,
                        r[--e] = 0,
                        new A(r)
                }(t, this.n.bitLength() + 7 >> 3);
                if (null == e)
                    return null;
                var r = this.doPublic(e);
                if (null == r)
                    return null;
                var n = r.toString(16);
                return 0 == (1 & n.length) ? n : "0" + n
            }
            ,
            t.prototype.setPrivate = function (t, e, r) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = L(t, 16),
                    this.e = parseInt(e, 16),
                    this.d = L(r, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.setPrivateEx = function (t, e, r, n, i, o, a, s) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = L(t, 16),
                    this.e = parseInt(e, 16),
                    this.d = L(r, 16),
                    this.p = L(n, 16),
                    this.q = L(i, 16),
                    this.dmp1 = L(o, 16),
                    this.dmq1 = L(a, 16),
                    this.coeff = L(s, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.generate = function (t, e) {
                var r = new X
                    , n = t >> 1;
                this.e = parseInt(e, 16);
                for (var i = new A(e, 16); ;) {
                    for (; this.p = new A(t - n, 1, r),
                           0 != this.p.subtract(A.ONE).gcd(i).compareTo(A.ONE) || !this.p.isProbablePrime(10);)
                        ;
                    for (; this.q = new A(n, 1, r),
                           0 != this.q.subtract(A.ONE).gcd(i).compareTo(A.ONE) || !this.q.isProbablePrime(10);)
                        ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var o = this.p;
                        this.p = this.q,
                            this.q = o
                    }
                    var a = this.p.subtract(A.ONE)
                        , s = this.q.subtract(A.ONE)
                        , u = a.multiply(s);
                    if (0 == u.gcd(i).compareTo(A.ONE)) {
                        this.n = this.p.multiply(this.q),
                            this.d = i.modInverse(u),
                            this.dmp1 = this.d.mod(a),
                            this.dmq1 = this.d.mod(s),
                            this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            t.prototype.decrypt = function (t) {
                var e = L(t, 16)
                    , r = this.doPrivate(e);
                return null == r ? null : function (t, e) {
                    for (var r = t.toByteArray(), n = 0; n < r.length && 0 == r[n];)
                        ++n;
                    if (r.length - n != e - 1 || 2 != r[n])
                        return null;
                    for (++n; 0 != r[n];)
                        if (++n >= r.length)
                            return null;
                    for (var i = ""; ++n < r.length;) {
                        var o = 255 & r[n];
                        o < 128 ? i += String.fromCharCode(o) : o > 191 && o < 224 ? (i += String.fromCharCode((31 & o) << 6 | 63 & r[n + 1]),
                            ++n) : (i += String.fromCharCode((15 & o) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2]),
                            n += 2)
                    }
                    return i
                }(r, this.n.bitLength() + 7 >> 3)
            }
            ,
            t.prototype.generateAsync = function (t, e, r) {
                var n = new X
                    , i = t >> 1;
                this.e = parseInt(e, 16);
                var o = new A(e, 16)
                    , a = this
                    , s = function () {
                    var e = function () {
                        if (a.p.compareTo(a.q) <= 0) {
                            var t = a.p;
                            a.p = a.q,
                                a.q = t
                        }
                        var e = a.p.subtract(A.ONE)
                            , n = a.q.subtract(A.ONE)
                            , i = e.multiply(n);
                        0 == i.gcd(o).compareTo(A.ONE) ? (a.n = a.p.multiply(a.q),
                            a.d = o.modInverse(i),
                            a.dmp1 = a.d.mod(e),
                            a.dmq1 = a.d.mod(n),
                            a.coeff = a.q.modInverse(a.p),
                            setTimeout((function () {
                                    r()
                                }
                            ), 0)) : setTimeout(s, 0)
                    }
                        , u = function () {
                        a.q = D(),
                            a.q.fromNumberAsync(i, 1, n, (function () {
                                    a.q.subtract(A.ONE).gcda(o, (function (t) {
                                            0 == t.compareTo(A.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(u, 0)
                                        }
                                    ))
                                }
                            ))
                    }
                        , l = function () {
                        a.p = D(),
                            a.p.fromNumberAsync(t - i, 1, n, (function () {
                                    a.p.subtract(A.ONE).gcda(o, (function (t) {
                                            0 == t.compareTo(A.ONE) && a.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(l, 0)
                                        }
                                    ))
                                }
                            ))
                    };
                    setTimeout(l, 0)
                };
                setTimeout(s, 0)
            }
            ,
            t.prototype.sign = function (t, e, r) {
                var n = function (t, e) {
                    if (e < t.length + 22)
                        return console.error("Message too long for RSA"),
                            null;
                    for (var r = e - t.length - 6, n = "", i = 0; i < r; i += 2)
                        n += "ff";
                    return L("0001" + n + "00" + t, 16)
                }(($[r] || "") + e(t).toString(), this.n.bitLength() / 4);
                if (null == n)
                    return null;
                var i = this.doPrivate(n);
                if (null == i)
                    return null;
                var o = i.toString(16);
                return 0 == (1 & o.length) ? o : "0" + o
            }
            ,
            t.prototype.verify = function (t, e, r) {
                var n = L(e, 16)
                    , i = this.doPublic(n);
                return null == i ? null : function (t) {
                    for (var e in $)
                        if ($.hasOwnProperty(e)) {
                            var r = $[e]
                                , n = r.length;
                            if (t.substr(0, n) == r)
                                return t.substr(n)
                        }
                    return t
                }/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
                    (i.toString(16).replace(/^1f+00/, "")) == r(t).toString()
            }
            ,
            t
    }()
        , $ = {
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        ripemd160: "3021300906052b2403020105000414"
    }
        , Q = {};
    Q.lang = {
        extend: function (t, e, r) {
            if (!e || !t)
                throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
            var n = function () {
            };
            if (n.prototype = e.prototype,
                t.prototype = new n,
                t.prototype.constructor = t,
                t.superclass = e.prototype,
            e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                r) {
                var i;
                for (i in r)
                    t.prototype[i] = r[i];
                var o = function () {
                }
                    , a = ["toString", "valueOf"];
                try {
                    /MSIE/.test(navigator.userAgent) && (o = function (t, e) {
                            for (i = 0; i < a.length; i += 1) {
                                var r = a[i]
                                    , n = e[r];
                                "function" == typeof n && n != Object.prototype[r] && (t[r] = n)
                            }
                        }
                    )
                } catch (t) {
                }
                o(t.prototype, r)
            }
        }
    };
    /**
     * @fileOverview
     * @name asn1-1.0.js
     * @author Kenji Urushima kenji.urushima@gmail.com
     * @version asn1 1.0.13 (2017-Jun-02)
     * @since jsrsasign 2.1
     * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
     */
    var J = {};
    void 0 !== J.asn1 && J.asn1 || (J.asn1 = {}),
        J.asn1.ASN1Util = new function () {
            this.integerToByteHex = function (t) {
                var e = t.toString(16);
                return e.length % 2 == 1 && (e = "0" + e),
                    e
            }
                ,
                this.bigIntToMinTwosComplementsHex = function (t) {
                    var e = t.toString(16);
                    if ("-" != e.substr(0, 1))
                        e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                    else {
                        var r = e.substr(1).length;
                        r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                        for (var n = "", i = 0; i < r; i++)
                            n += "f";
                        e = new A(n, 16).xor(t).add(A.ONE).toString(16).replace(/^-/, "")
                    }
                    return e
                }
                ,
                this.getPEMStringFromHex = function (t, e) {
                    return hextopem(t, e)
                }
                ,
                this.newObject = function (t) {
                    var e = J.asn1
                        , r = e.DERBoolean
                        , n = e.DERInteger
                        , i = e.DERBitString
                        , o = e.DEROctetString
                        , a = e.DERNull
                        , s = e.DERObjectIdentifier
                        , u = e.DEREnumerated
                        , l = e.DERUTF8String
                        , c = e.DERNumericString
                        , f = e.DERPrintableString
                        , d = e.DERTeletexString
                        , h = e.DERIA5String
                        , p = e.DERUTCTime
                        , g = e.DERGeneralizedTime
                        , v = e.DERSequence
                        , y = e.DERSet
                        , m = e.DERTaggedObject
                        , b = e.ASN1Util.newObject
                        , E = Object.keys(t);
                    if (1 != E.length)
                        throw "key of param shall be only one.";
                    var T = E[0];
                    if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + T + ":"))
                        throw "undefined key: " + T;
                    if ("bool" == T)
                        return new r(t[T]);
                    if ("int" == T)
                        return new n(t[T]);
                    if ("bitstr" == T)
                        return new i(t[T]);
                    if ("octstr" == T)
                        return new o(t[T]);
                    if ("null" == T)
                        return new a(t[T]);
                    if ("oid" == T)
                        return new s(t[T]);
                    if ("enum" == T)
                        return new u(t[T]);
                    if ("utf8str" == T)
                        return new l(t[T]);
                    if ("numstr" == T)
                        return new c(t[T]);
                    if ("prnstr" == T)
                        return new f(t[T]);
                    if ("telstr" == T)
                        return new d(t[T]);
                    if ("ia5str" == T)
                        return new h(t[T]);
                    if ("utctime" == T)
                        return new p(t[T]);
                    if ("gentime" == T)
                        return new g(t[T]);
                    if ("seq" == T) {
                        for (var w = t[T], S = [], _ = 0; _ < w.length; _++) {
                            var x = b(w[_]);
                            S.push(x)
                        }
                        return new v({
                            array: S
                        })
                    }
                    if ("set" == T) {
                        for (w = t[T],
                                 S = [],
                                 _ = 0; _ < w.length; _++)
                            x = b(w[_]),
                                S.push(x);
                        return new y({
                            array: S
                        })
                    }
                    if ("tag" == T) {
                        var k = t[T];
                        if ("[object Array]" === Object.prototype.toString.call(k) && 3 == k.length) {
                            var A = b(k[2]);
                            return new m({
                                tag: k[0],
                                explicit: k[1],
                                obj: A
                            })
                        }
                        var O = {};
                        if (void 0 !== k.explicit && (O.explicit = k.explicit),
                        void 0 !== k.tag && (O.tag = k.tag),
                        void 0 === k.obj)
                            throw "obj shall be specified for 'tag'.";
                        return O.obj = b(k.obj),
                            new m(O)
                    }
                }
                ,
                this.jsonToASN1HEX = function (t) {
                    return this.newObject(t).getEncodedHex()
                }
        }
        ,
        J.asn1.ASN1Util.oidHexToInt = function (t) {
            for (var e = "", r = parseInt(t.substr(0, 2), 16), n = (e = Math.floor(r / 40) + "." + r % 40,
                ""), i = 2; i < t.length; i += 2) {
                var o = ("00000000" + parseInt(t.substr(i, 2), 16).toString(2)).slice(-8);
                n += o.substr(1, 7),
                "0" == o.substr(0, 1) && (e = e + "." + new A(n, 2).toString(10),
                    n = "")
            }
            return e
        }
        ,
        J.asn1.ASN1Util.oidIntToHex = function (t) {
            var e = function (t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                    e
            }
                , r = function (t) {
                var r = ""
                    , n = new A(t, 10).toString(2)
                    , i = 7 - n.length % 7;
                7 == i && (i = 0);
                for (var o = "", a = 0; a < i; a++)
                    o += "0";
                for (n = o + n,
                         a = 0; a < n.length - 1; a += 7) {
                    var s = n.substr(a, 7);
                    a != n.length - 7 && (s = "1" + s),
                        r += e(parseInt(s, 2))
                }
                return r
            };
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var n = ""
                , i = t.split(".")
                , o = 40 * parseInt(i[0]) + parseInt(i[1]);
            n += e(o),
                i.splice(0, 2);
            for (var a = 0; a < i.length; a++)
                n += r(i[a]);
            return n
        }
        ,
        J.asn1.ASN1Object = function () {
            this.getLengthHexFromValue = function () {
                if (void 0 === this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                var t = this.hV.length / 2
                    , e = t.toString(16);
                if (e.length % 2 == 1 && (e = "0" + e),
                t < 128)
                    return e;
                var r = e.length / 2;
                if (r > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                return (128 + r).toString(16) + e
            }
                ,
                this.getEncodedHex = function () {
                    return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                        this.hL = this.getLengthHexFromValue(),
                        this.hTLV = this.hT + this.hL + this.hV,
                        this.isModified = !1),
                        this.hTLV
                }
                ,
                this.getValueHex = function () {
                    return this.getEncodedHex(),
                        this.hV
                }
                ,
                this.getFreshValueHex = function () {
                    return ""
                }
        }
        ,
        J.asn1.DERAbstractString = function (t) {
            J.asn1.DERAbstractString.superclass.constructor.call(this),
                this.getString = function () {
                    return this.s
                }
                ,
                this.setString = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = t,
                        this.hV = stohex(this.s)
                }
                ,
                this.setStringHex = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = t
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }
        ,
        Q.lang.extend(J.asn1.DERAbstractString, J.asn1.ASN1Object),
        J.asn1.DERAbstractTime = function (t) {
            J.asn1.DERAbstractTime.superclass.constructor.call(this),
                this.localDateToUTC = function (t) {
                    return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
                        new Date(utc)
                }
                ,
                this.formatDate = function (t, e, r) {
                    var n = this.zeroPadding
                        , i = this.localDateToUTC(t)
                        , o = String(i.getFullYear());
                    "utc" == e && (o = o.substr(2, 2));
                    var a = o + n(String(i.getMonth() + 1), 2) + n(String(i.getDate()), 2) + n(String(i.getHours()), 2) + n(String(i.getMinutes()), 2) + n(String(i.getSeconds()), 2);
                    if (!0 === r) {
                        var s = i.getMilliseconds();
                        if (0 != s) {
                            var u = n(String(s), 3);
                            a = a + "." + (u = u.replace(/[0]+$/, ""))
                        }
                    }
                    return a + "Z"
                }
                ,
                this.zeroPadding = function (t, e) {
                    return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
                }
                ,
                this.getString = function () {
                    return this.s
                }
                ,
                this.setString = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = t,
                        this.hV = stohex(t)
                }
                ,
                this.setByDateValue = function (t, e, r, n, i, o) {
                    var a = new Date(Date.UTC(t, e - 1, r, n, i, o, 0));
                    this.setByDate(a)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
        }
        ,
        Q.lang.extend(J.asn1.DERAbstractTime, J.asn1.ASN1Object),
        J.asn1.DERAbstractStructured = function (t) {
            J.asn1.DERAbstractString.superclass.constructor.call(this),
                this.setByASN1ObjectArray = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.asn1Array = t
                }
                ,
                this.appendASN1Object = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.asn1Array.push(t)
                }
                ,
                this.asn1Array = new Array,
            void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }
        ,
        Q.lang.extend(J.asn1.DERAbstractStructured, J.asn1.ASN1Object),
        J.asn1.DERBoolean = function () {
            J.asn1.DERBoolean.superclass.constructor.call(this),
                this.hT = "01",
                this.hTLV = "0101ff"
        }
        ,
        Q.lang.extend(J.asn1.DERBoolean, J.asn1.ASN1Object),
        J.asn1.DERInteger = function (t) {
            J.asn1.DERInteger.superclass.constructor.call(this),
                this.hT = "02",
                this.setByBigInteger = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = J.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                }
                ,
                this.setByInteger = function (t) {
                    var e = new A(String(t), 10);
                    this.setByBigInteger(e)
                }
                ,
                this.setValueHex = function (t) {
                    this.hV = t
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        Q.lang.extend(J.asn1.DERInteger, J.asn1.ASN1Object),
        J.asn1.DERBitString = function (t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = J.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            J.asn1.DERBitString.superclass.constructor.call(this),
                this.hT = "03",
                this.setHexValueIncludingUnusedBits = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = t
                }
                ,
                this.setUnusedBitsAndHexValue = function (t, e) {
                    if (t < 0 || 7 < t)
                        throw "unused bits shall be from 0 to 7: u = " + t;
                    var r = "0" + t;
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = r + e
                }
                ,
                this.setByBinaryString = function (t) {
                    var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                    8 == e && (e = 0);
                    for (var r = 0; r <= e; r++)
                        t += "0";
                    var n = "";
                    for (r = 0; r < t.length - 1; r += 8) {
                        var i = t.substr(r, 8)
                            , o = parseInt(i, 2).toString(16);
                        1 == o.length && (o = "0" + o),
                            n += o
                    }
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = "0" + e + n
                }
                ,
                this.setByBooleanArray = function (t) {
                    for (var e = "", r = 0; r < t.length; r++)
                        1 == t[r] ? e += "1" : e += "0";
                    this.setByBinaryString(e)
                }
                ,
                this.newFalseArray = function (t) {
                    for (var e = new Array(t), r = 0; r < t; r++)
                        e[r] = !1;
                    return e
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }
        ,
        Q.lang.extend(J.asn1.DERBitString, J.asn1.ASN1Object),
        J.asn1.DEROctetString = function (t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = J.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            J.asn1.DEROctetString.superclass.constructor.call(this, t),
                this.hT = "04"
        }
        ,
        Q.lang.extend(J.asn1.DEROctetString, J.asn1.DERAbstractString),
        J.asn1.DERNull = function () {
            J.asn1.DERNull.superclass.constructor.call(this),
                this.hT = "05",
                this.hTLV = "0500"
        }
        ,
        Q.lang.extend(J.asn1.DERNull, J.asn1.ASN1Object),
        J.asn1.DERObjectIdentifier = function (t) {
            var e = function (t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                    e
            }
                , r = function (t) {
                var r = ""
                    , n = new A(t, 10).toString(2)
                    , i = 7 - n.length % 7;
                7 == i && (i = 0);
                for (var o = "", a = 0; a < i; a++)
                    o += "0";
                for (n = o + n,
                         a = 0; a < n.length - 1; a += 7) {
                    var s = n.substr(a, 7);
                    a != n.length - 7 && (s = "1" + s),
                        r += e(parseInt(s, 2))
                }
                return r
            };
            J.asn1.DERObjectIdentifier.superclass.constructor.call(this),
                this.hT = "06",
                this.setValueHex = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = t
                }
                ,
                this.setValueOidString = function (t) {
                    if (!t.match(/^[0-9.]+$/))
                        throw "malformed oid string: " + t;
                    var n = ""
                        , i = t.split(".")
                        , o = 40 * parseInt(i[0]) + parseInt(i[1]);
                    n += e(o),
                        i.splice(0, 2);
                    for (var a = 0; a < i.length; a++)
                        n += r(i[a]);
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = n
                }
                ,
                this.setValueName = function (t) {
                    var e = J.asn1.x509.OID.name2oid(t);
                    if ("" === e)
                        throw "DERObjectIdentifier oidName undefined: " + t;
                    this.setValueOidString(e)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }
        ,
        Q.lang.extend(J.asn1.DERObjectIdentifier, J.asn1.ASN1Object),
        J.asn1.DEREnumerated = function (t) {
            J.asn1.DEREnumerated.superclass.constructor.call(this),
                this.hT = "0a",
                this.setByBigInteger = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = J.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                }
                ,
                this.setByInteger = function (t) {
                    var e = new A(String(t), 10);
                    this.setByBigInteger(e)
                }
                ,
                this.setValueHex = function (t) {
                    this.hV = t
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        Q.lang.extend(J.asn1.DEREnumerated, J.asn1.ASN1Object),
        J.asn1.DERUTF8String = function (t) {
            J.asn1.DERUTF8String.superclass.constructor.call(this, t),
                this.hT = "0c"
        }
        ,
        Q.lang.extend(J.asn1.DERUTF8String, J.asn1.DERAbstractString),
        J.asn1.DERNumericString = function (t) {
            J.asn1.DERNumericString.superclass.constructor.call(this, t),
                this.hT = "12"
        }
        ,
        Q.lang.extend(J.asn1.DERNumericString, J.asn1.DERAbstractString),
        J.asn1.DERPrintableString = function (t) {
            J.asn1.DERPrintableString.superclass.constructor.call(this, t),
                this.hT = "13"
        }
        ,
        Q.lang.extend(J.asn1.DERPrintableString, J.asn1.DERAbstractString),
        J.asn1.DERTeletexString = function (t) {
            J.asn1.DERTeletexString.superclass.constructor.call(this, t),
                this.hT = "14"
        }
        ,
        Q.lang.extend(J.asn1.DERTeletexString, J.asn1.DERAbstractString),
        J.asn1.DERIA5String = function (t) {
            J.asn1.DERIA5String.superclass.constructor.call(this, t),
                this.hT = "16"
        }
        ,
        Q.lang.extend(J.asn1.DERIA5String, J.asn1.DERAbstractString),
        J.asn1.DERUTCTime = function (t) {
            J.asn1.DERUTCTime.superclass.constructor.call(this, t),
                this.hT = "17",
                this.setByDate = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.date = t,
                        this.s = this.formatDate(this.date, "utc"),
                        this.hV = stohex(this.s)
                }
                ,
                this.getFreshValueHex = function () {
                    return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                        this.s = this.formatDate(this.date, "utc"),
                        this.hV = stohex(this.s)),
                        this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }
        ,
        Q.lang.extend(J.asn1.DERUTCTime, J.asn1.DERAbstractTime),
        J.asn1.DERGeneralizedTime = function (t) {
            J.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
                this.hT = "18",
                this.withMillis = !1,
                this.setByDate = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.date = t,
                        this.s = this.formatDate(this.date, "gen", this.withMillis),
                        this.hV = stohex(this.s)
                }
                ,
                this.getFreshValueHex = function () {
                    return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                        this.s = this.formatDate(this.date, "gen", this.withMillis),
                        this.hV = stohex(this.s)),
                        this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
            !0 === t.millis && (this.withMillis = !0))
        }
        ,
        Q.lang.extend(J.asn1.DERGeneralizedTime, J.asn1.DERAbstractTime),
        J.asn1.DERSequence = function (t) {
            J.asn1.DERSequence.superclass.constructor.call(this, t),
                this.hT = "30",
                this.getFreshValueHex = function () {
                    for (var t = "", e = 0; e < this.asn1Array.length; e++)
                        t += this.asn1Array[e].getEncodedHex();
                    return this.hV = t,
                        this.hV
                }
        }
        ,
        Q.lang.extend(J.asn1.DERSequence, J.asn1.DERAbstractStructured),
        J.asn1.DERSet = function (t) {
            J.asn1.DERSet.superclass.constructor.call(this, t),
                this.hT = "31",
                this.sortFlag = !0,
                this.getFreshValueHex = function () {
                    for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                        var r = this.asn1Array[e];
                        t.push(r.getEncodedHex())
                    }
                    return 1 == this.sortFlag && t.sort(),
                        this.hV = t.join(""),
                        this.hV
                }
                ,
            void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }
        ,
        Q.lang.extend(J.asn1.DERSet, J.asn1.DERAbstractStructured),
        J.asn1.DERTaggedObject = function (t) {
            J.asn1.DERTaggedObject.superclass.constructor.call(this),
                this.hT = "a0",
                this.hV = "",
                this.isExplicit = !0,
                this.asn1Object = null,
                this.setASN1Object = function (t, e, r) {
                    this.hT = e,
                        this.isExplicit = t,
                        this.asn1Object = r,
                        this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                            this.hTLV = null,
                            this.isModified = !0) : (this.hV = null,
                            this.hTLV = r.getEncodedHex(),
                            this.hTLV = this.hTLV.replace(/^../, e),
                            this.isModified = !1)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
            void 0 !== t.explicit && (this.isExplicit = t.explicit),
            void 0 !== t.obj && (this.asn1Object = t.obj,
                this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        Q.lang.extend(J.asn1.DERTaggedObject, J.asn1.ASN1Object);
    var Z = function (t) {
        function e(r) {
            var n = t.call(this) || this;
            return r && ("string" == typeof r ? n.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)),
                n
        }

        return function (t, e) {
            function r() {
                this.constructor = t
            }

            h(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                    new r)
        }(e, t),
            e.prototype.parseKey = function (t) {
                try {
                    var e = 0
                        , r = 0
                        , n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? p(t) : g.unarmor(t)
                        , i = S.decode(n);
                    if (3 === i.sub.length && (i = i.sub[2].sub[0]),
                    9 === i.sub.length) {
                        e = i.sub[1].getHexStringValue(),
                            this.n = L(e, 16),
                            r = i.sub[2].getHexStringValue(),
                            this.e = parseInt(r, 16);
                        var o = i.sub[3].getHexStringValue();
                        this.d = L(o, 16);
                        var a = i.sub[4].getHexStringValue();
                        this.p = L(a, 16);
                        var s = i.sub[5].getHexStringValue();
                        this.q = L(s, 16);
                        var u = i.sub[6].getHexStringValue();
                        this.dmp1 = L(u, 16);
                        var l = i.sub[7].getHexStringValue();
                        this.dmq1 = L(l, 16);
                        var c = i.sub[8].getHexStringValue();
                        this.coeff = L(c, 16)
                    } else {
                        if (2 !== i.sub.length)
                            return !1;
                        var f = i.sub[1].sub[0];
                        e = f.sub[0].getHexStringValue(),
                            this.n = L(e, 16),
                            r = f.sub[1].getHexStringValue(),
                            this.e = parseInt(r, 16)
                    }
                    return !0
                } catch (t) {
                    return !1
                }
            }
            ,
            e.prototype.getPrivateBaseKey = function () {
                var t = {
                    array: [new J.asn1.DERInteger({
                        int: 0
                    }), new J.asn1.DERInteger({
                        bigint: this.n
                    }), new J.asn1.DERInteger({
                        int: this.e
                    }), new J.asn1.DERInteger({
                        bigint: this.d
                    }), new J.asn1.DERInteger({
                        bigint: this.p
                    }), new J.asn1.DERInteger({
                        bigint: this.q
                    }), new J.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new J.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new J.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                };
                return new J.asn1.DERSequence(t).getEncodedHex()
            }
            ,
            e.prototype.getPrivateBaseKeyB64 = function () {
                return l(this.getPrivateBaseKey())
            }
            ,
            e.prototype.getPublicBaseKey = function () {
                var t = new J.asn1.DERSequence({
                    array: [new J.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new J.asn1.DERNull]
                })
                    , e = new J.asn1.DERSequence({
                    array: [new J.asn1.DERInteger({
                        bigint: this.n
                    }), new J.asn1.DERInteger({
                        int: this.e
                    })]
                })
                    , r = new J.asn1.DERBitString({
                    hex: "00" + e.getEncodedHex()
                });
                return new J.asn1.DERSequence({
                    array: [t, r]
                }).getEncodedHex()
            }
            ,
            e.prototype.getPublicBaseKeyB64 = function () {
                return l(this.getPublicBaseKey())
            }
            ,
            e.wordwrap = function (t, e) {
                if (!t)
                    return t;
                var r = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(r, "g")).join("\n")
            }
            ,
            e.prototype.getPrivateKey = function () {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                    t += "-----END RSA PRIVATE KEY-----"
            }
            ,
            e.prototype.getPublicKey = function () {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                    t += "-----END PUBLIC KEY-----"
            }
            ,
            e.hasPublicKeyProperty = function (t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
            }
            ,
            e.hasPrivateKeyProperty = function (t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }
            ,
            e.prototype.parsePropertiesFrom = function (t) {
                this.n = t.n,
                    this.e = t.e,
                t.hasOwnProperty("d") && (this.d = t.d,
                    this.p = t.p,
                    this.q = t.q,
                    this.dmp1 = t.dmp1,
                    this.dmq1 = t.dmq1,
                    this.coeff = t.coeff)
            }
            ,
            e
    }(q)
        , tt = function () {
        function t(t) {
            t = t || {},
                this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
                this.default_public_exponent = t.default_public_exponent || "010001",
                this.log = t.log || !1,
                this.key = null
        }

        return t.prototype.setKey = function (t) {
            this.log && this.key && console.warn("A key was already set, overriding existing."),
                this.key = new Z(t)
        }
            ,
            t.prototype.setPrivateKey = function (t) {
                this.setKey(t)
            }
            ,
            t.prototype.setPublicKey = function (t) {
                this.setKey(t)
            }
            ,
            t.prototype.decrypt = function (t) {
                try {
                    return this.getKey().decrypt(c(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.encrypt = function (t) {
                try {
                    return l(this.getKey().encrypt(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.sign = function (t, e, r) {
                try {
                    return l(this.getKey().sign(t, e, r))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.verify = function (t, e, r) {
                try {
                    return this.getKey().verify(t, c(e), r)
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.getKey = function (t) {
                if (!this.key) {
                    if (this.key = new Z,
                    t && "[object Function]" === {}.toString.call(t))
                        return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }
            ,
            t.prototype.getPrivateKey = function () {
                return this.getKey().getPrivateKey()
            }
            ,
            t.prototype.getPrivateKeyB64 = function () {
                return this.getKey().getPrivateBaseKeyB64()
            }
            ,
            t.prototype.getPublicKey = function () {
                return this.getKey().getPublicKey()
            }
            ,
            t.prototype.getPublicKeyB64 = function () {
                return this.getKey().getPublicBaseKeyB64()
            }
            ,
            t.version = "3.0.0-rc.1",
            t
    }();
    window.JSEncrypt = tt,
        t.JSEncrypt = tt,
        t.default = tt,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
}(window)

function get_pwd(e) {
    var r = new JSEncrypt;
    return r.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCVhaR3Or7suUlwHUl2Ly36uVmboZ3+HhovogDjLgRE9CbaUokS2eqGaVFfbxAUxFThNDuXq/fBD+SdUgppmcZrIw4HMMP4AtE2qJJQH/KxPWmbXH7Lv+9CisNtPYOlvWJ/GHRqf9x3TBKjjeJ2CjuVxlPBDX63+Ecil2JR9klVawIDAQAB"),
        r.encrypt(e)
}
