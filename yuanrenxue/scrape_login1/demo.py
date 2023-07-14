# _*_ coding: utf-8 _*_
# @Date:  10:52 上午
# @File: demo.py
# @Author: liyf
import requests
import json
import execjs

from loguru import logger

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://login1.scrape.center",
    "Pragma": "no-cache",
    "Referer": "https://login1.scrape.center/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
}


def get_token(params):
    js_str = '''
    // 补atob 和btoa 环境
    // ============================================================
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
    // ============================================================
    var re_utob = /[\\uD800-\\uDBFF][\\uDC00-\\uDFFFF]|[^\\x00-\\x7F]/g,
        utob = function (e) {
            return e.replace(re_utob, cb_utob)
        },
        _encode = function (e) {
            return self.btoa(utob(e))
        },
        cb_utob = function (e) {
            if (e.length < 2) {
                var r = e.charCodeAt(0);
                return r < 128 ? e : r < 2048 ? fromCharCode(192 | r >>> 6) + fromCharCode(128 | 63 & r) : fromCharCode(224 | r >>> 12 & 15) + fromCharCode(128 | r >>> 6 & 63) + fromCharCode(128 | 63 & r)
            }
            r = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return fromCharCode(240 | r >>> 18 & 7) + fromCharCode(128 | r >>> 12 & 63) + fromCharCode(128 | r >>> 6 & 63) + fromCharCode(128 | 63 & r)
        };
    
    var c = {
        encode: function (e, r) {
            return r ? _encode(String(e)).replace(/[+\/]/g, (function (e) {
                    return "+" == e ? "-" : "_"
                }
            )).replace(/=/g, "") : _encode(String(e))
        }
    }
    
    function get_token(e) {
        var token = c.encode(JSON.stringify(e));
        return token
    }
    '''
    ctx = execjs.compile(''.join(js_str))
    token = ctx.call('get_token', params)
    return token


def get_login_res():
    url = "https://login1.scrape.center/"
    params = {
        'username': 'admin',
        'password': 'admin'
    }
    token = get_token(params)
    logger.info(f'token: {token}')
    data = {
        "token": token
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)
    logger.info(f'请求状态码: {response.status_code}')


if __name__ == '__main__':
    get_login_res()
