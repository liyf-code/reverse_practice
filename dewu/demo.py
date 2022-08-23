# _*_ coding: utf-8 _*_
# @Date:  3:21 下午
# @File: demo.py
# @Author: liyf

"""
todo: https://m.poizon.com/router/
破解得物产品列表页中请求参数 `sign`
接口: https://app.poizon.com/api/v1/h5/index/fire/index
    - POST请求
    - params中 `sign` 需要破解
通过搜索关键字 `sign:` 可以定位到加密函数在 `index.7cee99cc.js`文件第9296行，如下：
todo```
    var n = C(e.params);
    return e.params = L({
        sign: n
    }, e.params),
    ```
其中 `C(e.params)` 就是生成sign的入口，且e.params=发送post请求需要的参数。
接着就是常规操作，下断点，进入该函数之后，看下该函数做了什么操作，然后实行 `缺啥补啥` 的准则，扣js代码。
"""

import execjs
import requests

from loguru import logger


def get_sign(page):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    data = ctx.call('get_sign', page)
    return data


def get_results(page):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Origin': 'https://m.poizon.com',
        'Referer': 'https://m.poizon.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    }
    sign = get_sign(page)
    logger.info(f'第 {page} 页: {sign}')
    json_data = {
        'sign': sign,
        'tabId': '',
        'limit': 20,
        'lastId': page,
        'platform': 'h5',
        'version': '4.73.0',
        'isVisitor': False,
        'newAdvForH5': True,
    }

    response = requests.post('https://app.poizon.com/api/v1/h5/index/fire/index', headers=headers, json=json_data)
    return response.json()


def parse():
    for page in range(1, 20):
        results = get_results(page)
        data_list = results['data']['hotList']
        for data in data_list:
            product = data['product']
            title = product['title']
            soldCountText = product['soldCountText']
            price = int(product['price']) / 100
            logoUrl = product['logoUrl']
            print(f'产品名称: {title}\n价格: {price}\n销量: {soldCountText}\n图片地址: {logoUrl}')
            print('===' * 35)


if __name__ == '__main__':
    parse()
