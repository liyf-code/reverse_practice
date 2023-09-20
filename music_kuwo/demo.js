window = global;  // ReferenceError: window is not defined
var kuwo;

!function (e) {
    function n(data) {
        for (var n, t, d = data[0], l = data[1], f = data[2], i = 0, m = []; i < d.length; i++)
            t = d[i],
            Object.prototype.hasOwnProperty.call(o, t) && o[t] && m.push(o[t][0]),
                o[t] = 0;
        for (n in l)
            Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
        for (h && h(data); m.length;)
            m.shift()();
        return c.push.apply(c, f || []),
            r()
    }

    function r() {
        for (var e, i = 0; i < c.length; i++) {
            for (var n = c[i], r = !0, t = 1; t < n.length; t++) {
                var l = n[t];
                0 !== o[l] && (r = !1)
            }
            r && (c.splice(i--, 1),
                e = d(d.s = n[0]))
        }
        return e
    }

    var t = {}
        , o = {
        32: 0
    }
        , c = [];

    function d(n) {
        if (t[n])
            return t[n].exports;
        var r = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, d),
            r.l = !0,
            r.exports
    }

    d.e = function (e) {
        var n = []
            , r = o[e];
        if (0 !== r)
            if (r)
                n.push(r[2]);
            else {
                var t = new Promise((function (n, t) {
                        r = o[e] = [n, t]
                    }
                ));
                n.push(r[2] = t);
                var c, script = document.createElement("script");
                script.charset = "utf-8",
                    script.timeout = 120,
                d.nc && script.setAttribute("nonce", d.nc),
                    script.src = function (e) {
                        return d.p + "" + ({
                            0: "commons/5b7f9e1d",
                            1: "vendors/f2d66b02",
                            2: "vendors/0f68e262",
                            5: "pages/album_detail/_index",
                            6: "pages/blackshark/index",
                            7: "pages/callback",
                            8: "pages/down/index",
                            9: "pages/downtingshu/index",
                            10: "pages/index",
                            11: "pages/logout/index",
                            12: "pages/musician/index",
                            13: "pages/musician/page",
                            14: "pages/mvplay/_index",
                            15: "pages/mvs/index",
                            16: "pages/play_detail/_index",
                            17: "pages/playlist_detail/_index",
                            18: "pages/playlists/index",
                            19: "pages/rankList/index",
                            20: "pages/search",
                            21: "pages/search/album",
                            22: "pages/search/list",
                            23: "pages/search/mv",
                            24: "pages/search/playlist",
                            25: "pages/search/singers",
                            26: "pages/singer_detail/_index",
                            27: "pages/singer_detail/index/album",
                            28: "pages/singer_detail/index/index",
                            29: "pages/singer_detail/index/info",
                            30: "pages/singer_detail/index/mv",
                            31: "pages/singers/index"
                        }[e] || e) + "." + {
                            0: "3c894e9",
                            1: "5eed629",
                            2: "cd1088d",
                            5: "1a23f85",
                            6: "52c5852",
                            7: "ffdfc35",
                            8: "9e04c35",
                            9: "c696cde",
                            10: "db8cca4",
                            11: "f408250",
                            12: "0c81730",
                            13: "0799acf",
                            14: "a5fd58f",
                            15: "0461e5e",
                            16: "0e368d6",
                            17: "6257225",
                            18: "f122f55",
                            19: "638f2b7",
                            20: "c8e9583",
                            21: "1d795e2",
                            22: "c424f0f",
                            23: "f545147",
                            24: "bd02de8",
                            25: "b2a7c73",
                            26: "0b39416",
                            27: "3e86c2a",
                            28: "c5442ca",
                            29: "62e90ad",
                            30: "d90b748",
                            31: "a902d46"
                        }[e] + ".js"
                    }(e);
                var l = new Error;
                c = function (n) {
                    script.onerror = script.onload = null,
                        clearTimeout(f);
                    var r = o[e];
                    if (0 !== r) {
                        if (r) {
                            var t = n && ("load" === n.type ? "missing" : n.type)
                                , c = n && n.target && n.target.src;
                            l.message = "Loading chunk " + e + " failed.\n(" + t + ": " + c + ")",
                                l.name = "ChunkLoadError",
                                l.type = t,
                                l.request = c,
                                r[1](l)
                        }
                        o[e] = void 0
                    }
                }
                ;
                var f = setTimeout((function () {
                        c({
                            type: "timeout",
                            target: script
                        })
                    }
                ), 12e4);
                script.onerror = script.onload = c,
                    document.head.appendChild(script)
            }
        return Promise.all(n)
    }
        ,
        d.m = e,
        d.c = t,
        d.d = function (e, n, r) {
            d.o(e, n) || Object.defineProperty(e, n, {
                enumerable: !0,
                get: r
            })
        }
        ,
        d.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        d.t = function (e, n) {
            if (1 & n && (e = d(e)),
            8 & n)
                return e;
            if (4 & n && "object" == typeof e && e && e.__esModule)
                return e;
            var r = Object.create(null);
            if (d.r(r),
                Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }),
            2 & n && "string" != typeof e)
                for (var t in e)
                    d.d(r, t, function (n) {
                        return e[n]
                    }
                        .bind(null, t));
            return r
        }
        ,
        d.n = function (e) {
            var n = e && e.__esModule ? function () {
                    return e.default
                }
                : function () {
                    return e
                }
            ;
            return d.d(n, "a", n),
                n
        }
        ,
        d.o = function (object, e) {
            return Object.prototype.hasOwnProperty.call(object, e)
        }
        ,
        d.p = "https://h5static.kuwo.cn/www/kw-www/",
        d.oe = function (e) {
            throw console.error(e),
                e
        }
    ;
    var l = window.webpackJsonp = window.webpackJsonp || []
        , f = l.push.bind(l);
    l.push = n,
        l = l.slice();
    for (var i = 0; i < l.length; i++)
        n(l[i]);
    var h = f;
    kuwo = d;
}({
    109: function (t, e, n) {
        var r, o, l = n(202), c = n(203), h = 0, d = 0;
        t.exports = function (t, e, n) {
            var i = e && n || 0
                , b = e || []
                , f = (t = t || {}).node || r
                , v = void 0 !== t.clockseq ? t.clockseq : o;
            if (null == f || null == v) {
                var m = l();
                null == f && (f = r = [1 | m[0], m[1], m[2], m[3], m[4], m[5]]),
                null == v && (v = o = 16383 & (m[6] << 8 | m[7]))
            }
            var y = void 0 !== t.msecs ? t.msecs : (new Date).getTime()
                , w = void 0 !== t.nsecs ? t.nsecs : d + 1
                , dt = y - h + (w - d) / 1e4;
            if (dt < 0 && void 0 === t.clockseq && (v = v + 1 & 16383),
            (dt < 0 || y > h) && void 0 === t.nsecs && (w = 0),
            w >= 1e4)
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            h = y,
                d = w,
                o = v;
            var x = (1e4 * (268435455 & (y += 122192928e5)) + w) % 4294967296;
            b[i++] = x >>> 24 & 255,
                b[i++] = x >>> 16 & 255,
                b[i++] = x >>> 8 & 255,
                b[i++] = 255 & x;
            var _ = y / 4294967296 * 1e4 & 268435455;
            b[i++] = _ >>> 8 & 255,
                b[i++] = 255 & _,
                b[i++] = _ >>> 24 & 15 | 16,
                b[i++] = _ >>> 16 & 255,
                b[i++] = v >>> 8 | 128,
                b[i++] = 255 & v;
            for (var A = 0; A < 6; ++A)
                b[i + A] = f[A];
            return e || c(b)
        }
    },
    202: function (t, e) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var r = new Uint8Array(16);
            t.exports = function () {
                return n(r),
                    r
            }
        } else {
            var o = new Array(16);
            t.exports = function () {
                for (var t, i = 0; i < 16; i++)
                    0 == (3 & i) && (t = 4294967296 * Math.random()),
                        o[i] = t >>> ((3 & i) << 3) & 255;
                return o
            }
        }
    },
    203: function (t, e) {
        for (var n = [], i = 0; i < 256; ++i)
            n[i] = (i + 256).toString(16).substr(1);
        t.exports = function (t, e) {
            var i = e || 0
                , r = n;
            return [r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]]].join("")
        }
    }
});

var l = kuwo(109),
    c = kuwo.n(l),
    r = c()();
console.log('reqid的值为:', r)