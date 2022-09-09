## 小红书-星鲜事 爬虫文档

- 逆向参数: 请求头中的 `X-Sign` 参数。

### 破解 `X-Sign`
- 全局搜索 `X-Sign`，只搜索到一个js文件，点进去之后即为加密位置，代码如下:
    ```javascript
    e.headers["X-Sign"] = function(e, t) {
        var r, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "X", i = e.url, s = void 0 === i ? "" : i, c = e.params, p = e.paramsSerializer;
        return s = u()(s).call(s, o()(s).call(s, "/fe_api/"), s.length),
        "X" === n ? a()(r = "".concat(n)).call(r, l()(t(s, c, p) + "WSUDD")) : ""
    }
    ```
- 其中各个参数的值：
    ```text
    s: '/fe_api/sns/v1/idol_ratings/hot_notes',
    c: {page: 2, num: 20},
    n: 'X',
    p: undefined,
    t(s, c, p): '/fe_api/sns/v1/idol_ratings/hot_notes?page=2&num=20WSUDD'
    ```
- 经过测试：
    X-sign = X + md5('/fe_api/sns/v1/idol_ratings/hot_notes?page=2&num=20' + 'WSUDD')

