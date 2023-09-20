global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer.from(str).toString('base64');
    };
}

if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer.from(b64Encoded, 'base64').toString();
    };
}
var self = global

window = {}

function encryptTime(t){
    var e = (1 * t + 1111111111111).toString().split(""),
        r = parseInt(10 * Math.random(), 10),
        n = parseInt(10 * Math.random(), 10),
        o = parseInt(10 * Math.random(), 10);
    return e.concat([r, n, o]).join("")
}

function encryptApiKey(){
    //this.API_KEY = "a2c903cc-b31e-4547-9299-b6d07b7631ab"
    var t = "a2c903cc-b31e-4547-9299-b6d07b7631ab",
        e = t.split(""),
        r = e.splice(0, 8);
    return e.concat(r).join("")
}

function comb(e, t){
    /*
    * var r = "".concat(t, "|").concat(e) 时
    * 得到的结果为：Mjc2ODExNzExOTg2MTg4OXwtYjMxZS00NTQ3LTkyOTktYjZkMDdiNzYzMWFiYTJjOTAzY2M=
    * 经过base64解密后的结果为：2768117119861889|-b31e-4547-9299-b6d07b7631aba2c903cc
    *
    * 而浏览器最终生成的x-apiKey的值为：LWIzMWUtNDU0Ny05Mjk5LWI2ZDA3Yjc2MzFhYmEyYzkwM2NjfDI3NjgxMTM1Nzc3MzE4ODk=
    * 经过解密后的值为：-b31e-4547-9299-b6d07b7631aba2c903cc|2768113577731889
    *
    * 两次解密的结果不一样，区别就是 `|` 前后的顺序不一致
    *
    * 所以，把t和e的位置颠倒一下即可
    * 即：当 r = "".concat(e, "|").concat(t) 时，能得到正确的x-apiKey
    */
    var r = "".concat(e, "|").concat(t);
    return self.btoa(r)
}

function getApiKey(){
    var t = (new Date).getTime(),
        e = encryptApiKey();
    return t = encryptTime(t), comb(e, t)
}

var res = getApiKey();
console.log(res)