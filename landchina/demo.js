window = global;
var run


!function (p) {
    function e(e) {
        for (var t, n, r = e[0], o = e[1], u = e[2], i = 0, f = []; i < r.length; i++)
            n = r[i],
            Object.prototype.hasOwnProperty.call(l, n) && l[n] && f.push(l[n][0]),
                l[n] = 0;
        for (t in o)
            Object.prototype.hasOwnProperty.call(o, t) && (p[t] = o[t]);
        for (s && s(e); f.length;)
            f.shift()();
        return a.push.apply(a, u || []),
            c()
    }

    function c() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], r = !0, o = 1; o < n.length; o++) {
                var u = n[o];
                0 !== l[u] && (r = !1)
            }
            r && (a.splice(t--, 1),
                e = i(i.s = n[0]))
        }
        return e
    }

    var n = {}
        , l = {
        app: 0
    }
        , a = [];

    function i(e) {
        var t;
        return (n[e] || (t = n[e] = {
            i: e,
            l: !1,
            exports: {}
        },
            p[e].call(t.exports, t, t.exports, i),
            t.l = !0,
            t)).exports
    }

    i.e = function () {
        return Promise.resolve()
    }
        ,
        i.m = p,
        i.c = n,
        i.d = function (e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }
        ,
        i.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        i.t = function (t, e) {
            if (1 & e && (t = i(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var n = Object.create(null);
            if (i.r(n),
                Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: t
                }),
            2 & e && "string" != typeof t)
                for (var r in t)
                    i.d(n, r, function (e) {
                        return t[e]
                    }
                        .bind(null, r));
            return n
        }
        ,
        i.n = function (e) {
            var t = e && e.__esModule ? function () {
                        return e.default
                    }
                    : function () {
                        return e
                    }
            ;
            return i.d(t, "a", t),
                t
        }
        ,
        i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        i.p = "./",
        i.oe = function (e) {
            throw e
        }
    ;
    var t = (r = window.webpackJsonp = window.webpackJsonp || []).push.bind(r);
    r.push = e;
    for (var r = r.slice(), o = 0; o < r.length; o++)
        e(r[o]);
    var s = t;
    a.push([0, "vendor", "manifest"]),
        run = i;
}({
    lPiR: function (e, t, n) {
        e.exports = function (e) {
            var o = Math
                , t = e
                , n = t.lib
                , r = n.WordArray
                , i = n.Hasher
                , a = t.algo
                , s = []
                , _ = [];

            function l(e) {
                var t = o.sqrt(e);
                for (var n = 2; n <= t; n++)
                    if (!(e % n))
                        return false;
                return true
            }

            function u(e) {
                return (e - (e | 0)) * 4294967296 | 0
            }

            var c = 2
                , d = 0;
            while (d < 64) {
                if (l(c)) {
                    if (d < 8)
                        s[d] = u(o.pow(c, 1 / 2));
                    _[d] = u(o.pow(c, 1 / 3));
                    d++
                }
                c++
            }
            var k = []
                , f = a.SHA256 = i.extend({
                _doReset: function () {
                    this._hash = new r.init(s.slice(0))
                },
                _doProcessBlock: function (e, t) {
                    var n = this._hash.words;
                    var r = n[0];
                    var o = n[1];
                    var i = n[2];
                    var a = n[3];
                    var s = n[4];
                    var l = n[5];
                    var u = n[6];
                    var c = n[7];
                    for (var d = 0; d < 64; d++) {
                        if (d < 16)
                            k[d] = e[t + d] | 0;
                        else {
                            var f = k[d - 15];
                            var p = (f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3;
                            var h = k[d - 2];
                            var g = (h << 15 | h >>> 17) ^ (h << 13 | h >>> 19) ^ h >>> 10;
                            k[d] = p + k[d - 7] + g + k[d - 16]
                        }
                        var b = s & l ^ ~s & u;
                        var m = r & o ^ r & i ^ o & i;
                        var v = (r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22);
                        var y = (s << 26 | s >>> 6) ^ (s << 21 | s >>> 11) ^ (s << 7 | s >>> 25);
                        var w = c + y + b + _[d] + k[d];
                        var x = v + m;
                        c = u;
                        u = l;
                        l = s;
                        s = a + w | 0;
                        a = i;
                        i = o;
                        o = r;
                        r = w + x | 0
                    }
                    n[0] = n[0] + r | 0;
                    n[1] = n[1] + o | 0;
                    n[2] = n[2] + i | 0;
                    n[3] = n[3] + a | 0;
                    n[4] = n[4] + s | 0;
                    n[5] = n[5] + l | 0;
                    n[6] = n[6] + u | 0;
                    n[7] = n[7] + c | 0
                },
                _doFinalize: function () {
                    var e = this._data;
                    var t = e.words;
                    var n = this._nDataBytes * 8;
                    var r = e.sigBytes * 8;
                    t[r >>> 5] |= 128 << 24 - r % 32;
                    t[(r + 64 >>> 9 << 4) + 14] = o.floor(n / 4294967296);
                    t[(r + 64 >>> 9 << 4) + 15] = n;
                    e.sigBytes = t.length * 4;
                    this._process();
                    return this._hash
                },
                clone: function () {
                    var e = i.clone.call(this);
                    e._hash = this._hash.clone();
                    return e
                }
            });
            return t.SHA256 = i._createHelper(f),
                t.HmacSHA256 = i._createHmacHelper(f),
                e.SHA256
        }(n("Ib8C"))
    },
    Ib8C: function (t, e, g) {
        !function (h) {
            var e;
            t.exports = (e = function (u) {
                var r;
                if ("undefined" != typeof window && window.crypto && (r = window.crypto),
                "undefined" != typeof self && self.crypto && (r = self.crypto),
                    !(r = !(r = !(r = "undefined" != typeof globalThis && globalThis.crypto ? globalThis.crypto : r) && "undefined" != typeof window && window.msCrypto ? window.msCrypto : r) && void 0 !== h && h.crypto ? h.crypto : r))
                    try {
                        r = g(1)
                    } catch (e) {
                    }
                var n = Object.create || function (e) {
                        return t.prototype = e,
                            e = new t,
                            t.prototype = null,
                            e
                    }
                ;

                function t() {
                }

                var e = {}
                    , o = e.lib = {}
                    , i = o.Base = {
                    extend: function (e) {
                        var t = n(this);
                        return e && t.mixIn(e),
                        t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
                                t.$super.init.apply(this, arguments)
                            }
                        ),
                            (t.init.prototype = t).$super = this,
                            t
                    },
                    create: function () {
                        var e = this.extend();
                        return e.init.apply(e, arguments),
                            e
                    },
                    init: function () {
                    },
                    mixIn: function (e) {
                        for (var t in e)
                            e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty("toString") && (this.toString = e.toString)
                    },
                    clone: function () {
                        return this.init.prototype.extend(this)
                    }
                }
                    , c = o.WordArray = i.extend({
                    init: function (e, t) {
                        e = this.words = e || [],
                            this.sigBytes = null != t ? t : 4 * e.length
                    },
                    toString: function (e) {
                        return (e || s).stringify(this)
                    },
                    concat: function (e) {
                        var t = this.words
                            , n = e.words
                            , r = this.sigBytes
                            , o = e.sigBytes;
                        if (this.clamp(),
                        r % 4)
                            for (var i = 0; i < o; i++) {
                                var a = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                t[r + i >>> 2] |= a << 24 - (r + i) % 4 * 8
                            }
                        else
                            for (var s = 0; s < o; s += 4)
                                t[r + s >>> 2] = n[s >>> 2];
                        return this.sigBytes += o,
                            this
                    },
                    clamp: function () {
                        var e = this.words
                            , t = this.sigBytes;
                        e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8,
                            e.length = u.ceil(t / 4)
                    },
                    clone: function () {
                        var e = i.clone.call(this);
                        return e.words = this.words.slice(0),
                            e
                    },
                    random: function (e) {
                        for (var t = [], n = 0; n < e; n += 4)
                            t.push(function () {
                                if (r) {
                                    if ("function" == typeof r.getRandomValues)
                                        try {
                                            return r.getRandomValues(new Uint32Array(1))[0]
                                        } catch (e) {
                                        }
                                    if ("function" == typeof r.randomBytes)
                                        try {
                                            return r.randomBytes(4).readInt32LE()
                                        } catch (e) {
                                        }
                                }
                                throw new Error("Native crypto module could not be used to get secure random number.")
                            }());
                        return new c.init(t, e)
                    }
                })
                    , a = e.enc = {}
                    , s = a.Hex = {
                    stringify: function (e) {
                        for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                            var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            r.push((i >>> 4).toString(16)),
                                r.push((15 & i).toString(16))
                        }
                        return r.join("")
                    },
                    parse: function (e) {
                        for (var t = e.length, n = [], r = 0; r < t; r += 2)
                            n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                        return new c.init(n, t / 2)
                    }
                }
                    , l = a.Latin1 = {
                    stringify: function (e) {
                        for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                            var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            r.push(String.fromCharCode(i))
                        }
                        return r.join("")
                    },
                    parse: function (e) {
                        for (var t = e.length, n = [], r = 0; r < t; r++)
                            n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                        return new c.init(n, t)
                    }
                }
                    , d = a.Utf8 = {
                    stringify: function (e) {
                        try {
                            return decodeURIComponent(escape(l.stringify(e)))
                        } catch (e) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function (e) {
                        return l.parse(unescape(encodeURIComponent(e)))
                    }
                }
                    , f = o.BufferedBlockAlgorithm = i.extend({
                    reset: function () {
                        this._data = new c.init,
                            this._nDataBytes = 0
                    },
                    _append: function (e) {
                        "string" == typeof e && (e = d.parse(e)),
                            this._data.concat(e),
                            this._nDataBytes += e.sigBytes
                    },
                    _process: function (e) {
                        var t, n = this._data, r = n.words, o = n.sigBytes, i = this.blockSize, a = o / (4 * i),
                            s = (a = e ? u.ceil(a) : u.max((0 | a) - this._minBufferSize, 0)) * i, e = u.min(4 * s, o);
                        if (s) {
                            for (var l = 0; l < s; l += i)
                                this._doProcessBlock(r, l);
                            t = r.splice(0, s),
                                n.sigBytes -= e
                        }
                        return new c.init(t, e)
                    },
                    clone: function () {
                        var e = i.clone.call(this);
                        return e._data = this._data.clone(),
                            e
                    },
                    _minBufferSize: 0
                })
                    , p = (o.Hasher = f.extend({
                    cfg: i.extend(),
                    init: function (e) {
                        this.cfg = this.cfg.extend(e),
                            this.reset()
                    },
                    reset: function () {
                        f.reset.call(this),
                            this._doReset()
                    },
                    update: function (e) {
                        return this._append(e),
                            this._process(),
                            this
                    },
                    finalize: function (e) {
                        return e && this._append(e),
                            this._doFinalize()
                    },
                    blockSize: 16,
                    _createHelper: function (n) {
                        return function (e, t) {
                            return new n.init(t).finalize(e)
                        }
                    },
                    _createHmacHelper: function (n) {
                        return function (e, t) {
                            return new p.HMAC.init(n, t).finalize(e)
                        }
                    }
                }),
                    e.algo = {});
                return e
            }(Math),
                e)
        }
            .call(this, g("yLpj"))
    },
    yLpj: function (e, t) {
        var n = function () {
            return this
        }();
        try {
            n = n || new Function("return this")()
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    },
});

function get_headers_hash(ua) {
    var n = run('lPiR'),
        url = 'https://api.landchina.com/tGyjh/plan/list',
        a = url.split('/'),
        hash = n(ua + (new Date).getDate() + a[a.length - 1]);
    return hash.toString()
}
