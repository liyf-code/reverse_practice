# _*_ coding: utf-8 _*_
# @Date:  10:30 上午
# @File: demo.py
# @Author: liyf

'''
changelog 20221018
加密方法没有变化，只是post请求对接口发生变化
变化前的接口: https://ggzyfw.fujian.gov.cn/Trade/TradeInfo
变化后的接口: https://ggzyfw.fujian.gov.cn/FwPortalApi/Trade/TradeInfo
**************************************************************

changelog 20220818
todo: https://ggzyfw.fujian.gov.cn/web/index.html#/business/list
该网站需要破解两处加密
1. 请求头 `portal-sign` 破解
    portal-sign 是通过对请求参数的一些操作之后，合并成一串字符串，然后对这个字符串进行md5加密
2. 返回数据解密
    - 由于是需要对接口返回的值进行解密
    - 所以通过搜索关键字 `decrypt(` 定位到解密函数在 `app.3cebabfd.js` 文件中，在返回值处下断点，点击下一页，断点生效
        function b(e) {
            var t = CryptoJS.enc.Utf8.parse('BE45D593014E4A4EB4449737660876CE')
                , n = CryptoJS.enc.Utf8.parse('A8909931867B0425')
                , a = CryptoJS.AES.decrypt(e, t, {
                iv: n,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return a.toString(CryptoJS.enc.Utf8)
        }
    - 在控制台输出 a.toString(CryptoJS.enc.Utf8)，为明文数据。
    - AES-CBC模式，Pkcs7填充方式
'''

import time
import json
import js2py
import execjs
import hashlib
import requests

from loguru import logger


def get_n(params):
    js_str = '''
    function l(e, t) {
        return e.toString().toUpperCase() > t.toString().toUpperCase() ? 1 : e.toString().toUpperCase() == t.toString().toUpperCase() ? 0 : -1
    }
    
    function s(e) {
        for (var t = Object.keys(e).sort(l), n = "", a = 0; a < t.length; a++)
            if (void 0 !== e[t[a]])
                if (e[t[a]] && e[t[a]] instanceof Object || e[t[a]] instanceof Array) {
                    var c = JSON.stringify(e[t[a]]);
                    n += t[a] + c
                } else
                    n += t[a] + e[t[a]];
        return n
    }
    
    function get_n(e) {
        for (var t in e)
            "" !== e[t] && void 0 !== e[t] || delete e[t];
        var n = '3637CB36B2E54A72A7002978D0506CDF' + s(e);
        return n
    }
    '''
    context = js2py.EvalJs()
    context.execute(js_str)
    n = context.get_n(params)
    return n


def get_data(Data):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    return ctx.call('b', Data)


def md5_encrypt(n) -> str:
    md5 = hashlib.md5()
    md5.update(n.encode('utf8'))
    return md5.hexdigest()


def get_results(page):
    json_data = {
        'pageNo': page,
        'pageSize': 20,
        'total': 6473,
        'KIND': 'GCJS',
        'GGTYPE': '1',
        'PROTYPE': '',
        'AREACODE': '',
        'M_PROJECT_TYPE': '',
        'timeType': '6',
        'BeginTime': '2022-02-17 00:00:00',
        'EndTime': '2022-08-17 23:59:59',
        'createTime': [],
        'ts': int(time.time() * 1000),
    }
    n = get_n(json_data)
    portal_sign = md5_encrypt(n)
    logger.info(f'第 {page} 页，portal_sign：{portal_sign}')
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'https://ggzyfw.fujian.gov.cn',
        'Referer': 'https://ggzyfw.fujian.gov.cn/web/index.html',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        'portal-sign': portal_sign,
    }
    response = requests.post('https://ggzyfw.fujian.gov.cn/FwPortalApi/Trade/TradeInfo', headers=headers,
                             json=json_data)
    return response.json()


def parse():
    for page in range(1, 324):
        results = get_results(page)
        data = json.loads(get_data(results['Data']))
        table_list = data['Table']
        for table in table_list:
            city_level = table['AREANAME']
            name = table['PLATFORM_NAME']
            title = table['NAME']
            update_time = table['TM1']
            print(f'【{city_level} - {name}】{title}  {str(update_time).split(" ")[0]}')
        print('===' * 35)


if __name__ == '__main__':
    parse()
