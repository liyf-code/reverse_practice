window = global;
!function () {
    "use strict";
    var root = "object" == typeof window ? window : {}
        , NODE_JS = !root.JS_SHA1_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
    NODE_JS && (root = global);
    var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && "object" == typeof module && module.exports
        // , AMD = __webpack_require__(331)
        , HEX_CHARS = "0123456789abcdef".split("")
        , EXTRA = [-2147483648, 8388608, 32768, 128]
        , SHIFT = [24, 16, 8, 0]
        , OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"]
        , blocks = []
        , createOutputMethod = function (t) {
            return function (e) {
                return new Sha1(!0).update(e)[t]()
            }
        }
        , createMethod = function () {
            var t = createOutputMethod("hex");
            NODE_JS && (t = nodeWrap(t)),
                t.create = function () {
                    return new Sha1
                }
                ,
                t.update = function (e) {
                    return t.create().update(e)
                }
            ;
            for (var e = 0; e < OUTPUT_TYPES.length; ++e) {
                var r = OUTPUT_TYPES[e];
                t[r] = createOutputMethod(r)
            }
            return t
        }
        , nodeWrap = function (method) {
            var crypto = eval("require('crypto')")
                , Buffer = eval("require('buffer').Buffer")
                , nodeMethod = function (t) {
                if ("string" == typeof t)
                    return crypto.createHash("sha1").update(t, "utf8").digest("hex");
                if (t.constructor === ArrayBuffer)
                    t = new Uint8Array(t);
                else if (void 0 === t.length)
                    return method(t);
                return crypto.createHash("sha1").update(new Buffer(t)).digest("hex")
            };
            return nodeMethod
        };

    function Sha1(t) {
        t ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
            this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            this.h0 = 1732584193,
            this.h1 = 4023233417,
            this.h2 = 2562383102,
            this.h3 = 271733878,
            this.h4 = 3285377520,
            this.block = this.start = this.bytes = this.hBytes = 0,
            this.finalized = this.hashed = !1,
            this.first = !0
    }

    Sha1.prototype.update = function (t) {
        if (!this.finalized) {
            var e = "string" != typeof t;
            e && t.constructor === root.ArrayBuffer && (t = new Uint8Array(t));
            for (var r, n, i = 0, o = t.length || 0, a = this.blocks; i < o;) {
                if (this.hashed && (this.hashed = !1,
                    a[0] = this.block,
                    a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0),
                    e)
                    for (n = this.start; i < o && n < 64; ++i)
                        a[n >> 2] |= t[i] << SHIFT[3 & n++];
                else
                    for (n = this.start; i < o && n < 64; ++i)
                        (r = t.charCodeAt(i)) < 128 ? a[n >> 2] |= r << SHIFT[3 & n++] : r < 2048 ? (a[n >> 2] |= (192 | r >> 6) << SHIFT[3 & n++],
                            a[n >> 2] |= (128 | 63 & r) << SHIFT[3 & n++]) : r < 55296 || r >= 57344 ? (a[n >> 2] |= (224 | r >> 12) << SHIFT[3 & n++],
                            a[n >> 2] |= (128 | r >> 6 & 63) << SHIFT[3 & n++],
                            a[n >> 2] |= (128 | 63 & r) << SHIFT[3 & n++]) : (r = 65536 + ((1023 & r) << 10 | 1023 & t.charCodeAt(++i)),
                            a[n >> 2] |= (240 | r >> 18) << SHIFT[3 & n++],
                            a[n >> 2] |= (128 | r >> 12 & 63) << SHIFT[3 & n++],
                            a[n >> 2] |= (128 | r >> 6 & 63) << SHIFT[3 & n++],
                            a[n >> 2] |= (128 | 63 & r) << SHIFT[3 & n++]);
                this.lastByteIndex = n,
                    this.bytes += n - this.start,
                    n >= 64 ? (this.block = a[16],
                        this.start = n - 64,
                        this.hash(),
                        this.hashed = !0) : this.start = n
            }
            return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0,
                this.bytes = this.bytes % 4294967296),
                this
        }
    }
        ,
        Sha1.prototype.finalize = function () {
            if (!this.finalized) {
                this.finalized = !0;
                var t = this.blocks
                    , e = this.lastByteIndex;
                t[16] = this.block,
                    t[e >> 2] |= EXTRA[3 & e],
                    this.block = t[16],
                e >= 56 && (this.hashed || this.hash(),
                    t[0] = this.block,
                    t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0),
                    t[14] = this.hBytes << 3 | this.bytes >>> 29,
                    t[15] = this.bytes << 3,
                    this.hash()
            }
        }
        ,
        Sha1.prototype.hash = function () {
            var t, e, r = this.h0, n = this.h1, i = this.h2, o = this.h3, a = this.h4, s = this.blocks;
            for (t = 16; t < 80; ++t)
                e = s[t - 3] ^ s[t - 8] ^ s[t - 14] ^ s[t - 16],
                    s[t] = e << 1 | e >>> 31;
            for (t = 0; t < 20; t += 5)
                r = (e = (n = (e = (i = (e = (o = (e = (a = (e = r << 5 | r >>> 27) + (n & i | ~n & o) + a + 1518500249 + s[t] << 0) << 5 | a >>> 27) + (r & (n = n << 30 | n >>> 2) | ~r & i) + o + 1518500249 + s[t + 1] << 0) << 5 | o >>> 27) + (a & (r = r << 30 | r >>> 2) | ~a & n) + i + 1518500249 + s[t + 2] << 0) << 5 | i >>> 27) + (o & (a = a << 30 | a >>> 2) | ~o & r) + n + 1518500249 + s[t + 3] << 0) << 5 | n >>> 27) + (i & (o = o << 30 | o >>> 2) | ~i & a) + r + 1518500249 + s[t + 4] << 0,
                    i = i << 30 | i >>> 2;
            for (; t < 40; t += 5)
                r = (e = (n = (e = (i = (e = (o = (e = (a = (e = r << 5 | r >>> 27) + (n ^ i ^ o) + a + 1859775393 + s[t] << 0) << 5 | a >>> 27) + (r ^ (n = n << 30 | n >>> 2) ^ i) + o + 1859775393 + s[t + 1] << 0) << 5 | o >>> 27) + (a ^ (r = r << 30 | r >>> 2) ^ n) + i + 1859775393 + s[t + 2] << 0) << 5 | i >>> 27) + (o ^ (a = a << 30 | a >>> 2) ^ r) + n + 1859775393 + s[t + 3] << 0) << 5 | n >>> 27) + (i ^ (o = o << 30 | o >>> 2) ^ a) + r + 1859775393 + s[t + 4] << 0,
                    i = i << 30 | i >>> 2;
            for (; t < 60; t += 5)
                r = (e = (n = (e = (i = (e = (o = (e = (a = (e = r << 5 | r >>> 27) + (n & i | n & o | i & o) + a - 1894007588 + s[t] << 0) << 5 | a >>> 27) + (r & (n = n << 30 | n >>> 2) | r & i | n & i) + o - 1894007588 + s[t + 1] << 0) << 5 | o >>> 27) + (a & (r = r << 30 | r >>> 2) | a & n | r & n) + i - 1894007588 + s[t + 2] << 0) << 5 | i >>> 27) + (o & (a = a << 30 | a >>> 2) | o & r | a & r) + n - 1894007588 + s[t + 3] << 0) << 5 | n >>> 27) + (i & (o = o << 30 | o >>> 2) | i & a | o & a) + r - 1894007588 + s[t + 4] << 0,
                    i = i << 30 | i >>> 2;
            for (; t < 80; t += 5)
                r = (e = (n = (e = (i = (e = (o = (e = (a = (e = r << 5 | r >>> 27) + (n ^ i ^ o) + a - 899497514 + s[t] << 0) << 5 | a >>> 27) + (r ^ (n = n << 30 | n >>> 2) ^ i) + o - 899497514 + s[t + 1] << 0) << 5 | o >>> 27) + (a ^ (r = r << 30 | r >>> 2) ^ n) + i - 899497514 + s[t + 2] << 0) << 5 | i >>> 27) + (o ^ (a = a << 30 | a >>> 2) ^ r) + n - 899497514 + s[t + 3] << 0) << 5 | n >>> 27) + (i ^ (o = o << 30 | o >>> 2) ^ a) + r - 899497514 + s[t + 4] << 0,
                    i = i << 30 | i >>> 2;
            this.h0 = this.h0 + r << 0,
                this.h1 = this.h1 + n << 0,
                this.h2 = this.h2 + i << 0,
                this.h3 = this.h3 + o << 0,
                this.h4 = this.h4 + a << 0
        }
        ,
        Sha1.prototype.hex = function () {
            this.finalize();
            var t = this.h0
                , e = this.h1
                , r = this.h2
                , n = this.h3
                , i = this.h4;
            return HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i]
        }
        ,
        Sha1.prototype.toString = Sha1.prototype.hex,
        Sha1.prototype.digest = function () {
            this.finalize();
            var t = this.h0
                , e = this.h1
                , r = this.h2
                , n = this.h3
                , i = this.h4;
            return [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i]
        }
        ,
        Sha1.prototype.array = Sha1.prototype.digest,
        Sha1.prototype.arrayBuffer = function () {
            this.finalize();
            var t = new ArrayBuffer(20)
                , e = new DataView(t);
            return e.setUint32(0, this.h0),
                e.setUint32(4, this.h1),
                e.setUint32(8, this.h2),
                e.setUint32(12, this.h3),
                e.setUint32(16, this.h4),
                t
        }
    ;
    window.sign = createMethod();
}()

function getQueryString(e) {
    var t = ""
        , r = Object.keys(e).sort((function (e, t) {
            return (e = e.toLowerCase()) < (t = t.toLowerCase()) ? -1 : e > t ? 1 : 0
        }
    ))
        , n = r.length;
    return r.forEach((function (r, o) {
            var a = e[r];
            t += "".concat(r, "=").concat(a),
            o < n - 1 && (t += "&")
        }
    )),
        t
}

function F(e) {
    var t = getQueryString(e) + "&" + 'WEB-V1-PRODUCT-E7768904917C4154A925FBE1A3848BC3E84E2C7770744E56AFBC9600C267891F';
    return sign(t.toUpperCase())
}
