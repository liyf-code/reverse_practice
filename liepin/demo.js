/*
- 控制台全局搜索 `X-Fscp-Trace-Id`，可以定位到在 `common.ee5c9e85.js` 文件中，有该参数的赋值，代码如下：
    ```javascript
    e.headers["X-Fscp-Trace-Id"] = w()
    ```
- 在该处打上断点，点击下一页，断点生效
- 进入 w 函数中，发现如下代码
    ```javascript
    var w = function(e, t, n) {
        var r = (e = e || {}).random || (e.rng || h)();
        if (r[6] = 15 & r[6] | 64,
        r[8] = 63 & r[8] | 128,
        t) {
            n = n || 0;
            for (var a = 0; a < 16; ++a)
                t[n + a] = r[a];
            return t
        }
        return x(r)
    }
    ```
  最终返回的 `x(r)` 即最终的结果。

- x 函数如下：
  ```javascript
    function x(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
            ,
            n = (g[e[t + 0]] + g[e[t + 1]] + g[e[t + 2]] + g[e[t + 3]] + "-" + g[e[t + 4]] + g[e[t + 5]] + "-" + g[e[t + 6]] + g[e[t + 7]] + "-" + g[e[t + 8]] + g[e[t + 9]] + "-" + g[e[t + 10]] + g[e[t + 11]] + g[e[t + 12]] + g[e[t + 13]] + g[e[t + 14]] + g[e[t + 15]]).toLowerCase();
        return n
    }
    ```
- 缺啥补啥，需要注意的是 `new Uint8Array(16)`，参考博客 [js逆向 模拟window.Crypto.getRandomValues](https://blog.csdn.net/Little__Panda/article/details/113566803)
*/

// js逆向 模拟window.Crypto.getRandomValues
function randoms(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomValues(buf) {
    var min = 0,
        max = 255;
    if (buf instanceof Uint16Array) {
        max = 65535;
    } else if (buf instanceof Uint32Array) {
        max = 4294967295;
    }
    for (var element in buf) {
        buf[element] = randoms(min, max);
    }
    return buf;
}

for (var g = [], b = 0; b < 256; ++b)
    g.push((b + 256).toString(16).substr(1));

function m() {
    var p = new Uint8Array(16), r = [];
    for (getRandomValues(p), G = 0; G < p.length; ++G)
        r.push(p[G])
    return r
}

function x(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
        ,
        n = (g[e[t + 0]] + g[e[t + 1]] + g[e[t + 2]] + g[e[t + 3]] + "-" + g[e[t + 4]] + g[e[t + 5]] + "-" + g[e[t + 6]] + g[e[t + 7]] + "-" + g[e[t + 8]] + g[e[t + 9]] + "-" + g[e[t + 10]] + g[e[t + 11]] + g[e[t + 12]] + g[e[t + 13]] + g[e[t + 14]] + g[e[t + 15]]).toLowerCase();
    return n
}

function get_x_fscp_teace_id() {
    var r = m();
    return x(r)
}

console.log(get_x_fscp_teace_id())
