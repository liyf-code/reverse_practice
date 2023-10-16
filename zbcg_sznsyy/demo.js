window = global;
var CryptoJS = require('crypto-js'),
    JSEnctypt = require('jsencrypt');

var p1 = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC3Lb0O4zgEakDfJ4XJO5zadXep9bQeWyJ6pa0e328PYQYZgLNP7eVrAP7mVZgG+8D4MicIcStTQnBxF8AEyJKrh/M/3WSSK2zDvrZn1paWf4SA8zFIn5cuYlcUH+WuxghQn3kKRUW2qtBY9eaGF5qntascctNgQTHmW3eqQzDBQIDAQAB"
    ,
    f1 = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALROqKeWuu+G6z6V7lesaAIC8FWWJ8qYRRy4HbbakJBH+OEWfD+0/MmMnZ28aMiV3qDy34SLfddDxvWJo/SR8iL8bjeqOEQxenu8Ogec+290w4F8IW6Ips/kZ5pnkg/TUn1GATOSV+RbB90okuykbBEbGKaNqGczJ/lI7RpfNvCpAgMBAAECgYA9RzJYaoizmRXgGlJ7Z3Odo2QMolB5sRBj90rZ9yQEdQFndh3aBOeYk/qJPhwad5zG9GP0hvfIrhczIYkgOG2i1ZvBAFBP7IZiGJz5PxS9QOFPg926sI6Mv3nBIS0+U88IyzPL/fQWNvhc3b9Y95kYp4p0Wk4zzNe9HNNUMQHdUQJBAOwA6EoVSlxlpNivoAGrMynLlnHmZ7fEpXXQINUbhpX8+I3fazoWcRaYpfLmVKa82DJXHUe8URFX3oir3kAocVUCQQDDlahWFmYmtNYqLitJdIdltTcmQtAgHlfshdYnq6Gg8jSjwh40sXF8MgZfG03+sfdmKbSG3e+7Ihb/X5P/odIFAkEAlz3Rn0BbojDlXpPWN5uOMzesFxwv1Z3o50JU+B0mt9IhO1I1dklRecijeLFRCHW3GzOmqQUu8q1cCDwUNwtz7QJBAJ3BT8coR/q+b+QT20xjVnaeBT6yM2dEskyP4x2aXUMROY5Am9aKrWuseeEqh+2ApHld+EO0LZJ2O7B96kUNw/UCQHhXTTBHc2HkyU84U2+OAB2hJtJBmj+eGl0iqNfOq3JyiIemC/bV74sASLa+NN9CJRotBh9jzmzNpwEi24Y8KHE=";


function get_t(e, t) {
    var n, i, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), r = [];
    if (t = t || a.length,
        e)
        for (n = 0; n < e; n++)
            r[n] = a[0 | Math.random() * t];
    else
        for (r[8] = r[13] = r[18] = r[23] = "-",
                 r[14] = "4",
                 n = 0; n < 36; n++)
            r[n] || (i = 0 | 16 * Math.random(),
                r[n] = a[19 == n ? 3 & i | 8 : i]);
    return r.join("")
}


function get_params(e) {
    var t = get_t(16, 16)
        , n = CryptoJS.enc.Utf8.parse(t)
        , i = CryptoJS.enc.Utf8.parse(JSON.stringify(e))
        , r = CryptoJS.AES.encrypt(i, n, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
        , c = r.toString();

    var l = new JSEnctypt;
    l.setPublicKey(p1);
    var u = l.encrypt(t);
    return {
        content: c,
        aesKey: u
    }
}

function decrypt(e, t) {
    var n = new JSEnctypt;
    n.setPrivateKey(f1);
    var i = n.decrypt(t)
        , r = CryptoJS.enc.Utf8.parse(i)
        , o = CryptoJS.AES.decrypt(e, r, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return JSON.parse(CryptoJS.enc.Utf8.stringify(o).toString())
}

function get_h1(e) {
    var t = get_t(16, 16)
        , n = CryptoJS.enc.Utf8.parse(t)
        , i = CryptoJS.enc.Utf8.parse(e)
        , r = CryptoJS.AES.encrypt(i, n, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
        , c = r.toString()
        , l = new JSEnctypt;
    l.setPublicKey(p1);
    var u = l.encrypt(t);
    return {
        content: c,
        aesKey: u
    }
}

function get_h2(e) {
    var t = get_t(16, 16)
        , n = CryptoJS.enc.Utf8.parse(t)
        , i = CryptoJS.enc.Utf8.parse(e)
        , r = CryptoJS.AES.encrypt(i, n, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
        , c = r.toString()
        , l = new JSEnctypt;
    l.setPublicKey(p1);
    var u = l.encrypt(t);
    return {
        content: c,
        aesKey: u
    }
}

function get_epcos(para) {
    const o = "function" === typeof btoa
        , s = "function" === typeof Buffer
        , c = "function" === typeof TextEncoder ? new TextEncoder : void 0
        , l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        , f = Array.prototype.slice.call(l)
        , p = String.fromCharCode.bind(String)
        , v = e => e.replace(/=/g, "").replace(/[+\/]/g, e => "+" == e ? "-" : "_")
        , y = e => {
        let t, r, n, i, a = "";
        const o = e.length % 3;
        for (let s = 0; s < e.length;) {
            if ((r = e.charCodeAt(s++)) > 255 || (n = e.charCodeAt(s++)) > 255 || (i = e.charCodeAt(s++)) > 255)
                throw new TypeError("invalid character found");
            t = r << 16 | n << 8 | i,
                a += f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
        }
        return o ? a.slice(0, o - 3) + "===".substring(o) : a
    }
        , g = o ? e => btoa(e) : s ? e => Buffer.from(e, "binary").toString("base64") : y
        , b = s ? e => Buffer.from(e).toString("base64") : e => {
        const t = 4096;
        let r = [];
        for (let n = 0, i = e.length; n < i; n += t)
            r.push(p.apply(null, e.subarray(n, n + t)));
        return g(r.join(""))
    }
        , k = e => {
        if (e.length < 2) {
            var t = e.charCodeAt(0);
            return t < 128 ? e : t < 2048 ? p(192 | t >>> 6) + p(128 | 63 & t) : p(224 | t >>> 12 & 15) + p(128 | t >>> 6 & 63) + p(128 | 63 & t)
        }
        t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
        return p(240 | t >>> 18 & 7) + p(128 | t >>> 12 & 63) + p(128 | t >>> 6 & 63) + p(128 | 63 & t)
    }
        , T = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
        , M = e => e.replace(T, k)
        , S = s ? e => Buffer.from(e, "utf8").toString("base64") : c ? e => b(c.encode(e)) : e => g(M(e))
        , E = (e, t = !1) => t ? v(S(e)) : S(e)
        , x = e => E(e, !0);
    var a1 = get_h1(para);
    var epcos = x(a1.content);
    return {
        epcos: epcos,
        aes_key: a1.aesKey
    }
}

