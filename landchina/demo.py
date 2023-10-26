# _*_ coding: utf-8 _*_
# @Date:  5:49 下午
# @File: demo.py
# @Author: liyf

'''
网址：https://www.landchina.com/#/supplyPlan
破解参数：请求头 Hash

步骤：
- 全局搜索 'hash='，可定位到以下代码
    var e = t.headers
      , n = (c.a.isKey("manageLoginToken") && (n = c.a.get("manageLoginToken"),
    !Object.prototype.hasOwnProperty.call(e, "manageLoginToken")) && n && (e.Authorization = "Bearer " + n),
    i("lPiR"))
      , a = t.url.split("/");
    return e.Hash = n(navigator.userAgent + (new Date).getDate() + a[a.length - 1])

- hash参数是由n函数生成，其中接收的参数为
    useragent + 【今天】的日期 + url以 / 分割后最后一个元素
- n 是由 i("lPiR") 生成的

显然是webpack，接下来就是常规的扣代码
- 生成器是 i
- 总共只需要扣取三个模块 lPiR Ib8C yLpj

接下来就可以正常生成hash参数了

经过测试，不携带该参数也可以请求到数据

该站点纯属练习webpack

'''

import json
import execjs
import requests

from loguru import logger

f = open('demo.js', 'r', encoding='utf8')
js_str = f.read()
ctx = execjs.compile(''.join(js_str))

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
}


def get_results(page):
    url = "https://api.landchina.com/tGyjh/plan/list"
    data = {
        "pageNum": page,
        "pageSize": 10,
        "startDate": "",
        "endDate": ""
    }
    hash = ctx.call('get_headers_hash', headers['User-Agent'])
    headers['Hash'] = hash
    logger.info(hash)
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)
    return response.json()


def parse():
    for page in range(1, 11):
        results = get_results(page)
        data_list = results['data']['list']
        for data in data_list:
            xzq = data['xzqFullName']
            title = data['biaoti']
            update_date = data['fbSj']
            print(f'行政区: {xzq}\n公告标题: {title}\n发布日期: {update_date}')
            print('---' * 20)
        print('***' * 30)


if __name__ == '__main__':
    parse()
