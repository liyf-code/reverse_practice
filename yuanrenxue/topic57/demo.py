# _*_ coding: utf-8 _*_
# @Date:  2:20 下午
# @File: demo.py
# @Author: liyf

"""
AES加密
CBC模式，Pkcs7填充方式
"""

import execjs
import requests

from loguru import logger


def get_results(page):
    headers = {
        'authority': 'www.python-spider.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }

    data = {
        'page': page,
    }

    response = requests.post('https://www.python-spider.com/api/challenge57', headers=headers, data=data)
    return response.json()


def get_data_list(result):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    return ctx.call('get_data_list', result)


if __name__ == '__main__':
    # 答案: 5153708
    count = 0
    for page in range(1, 101):
        results = get_results(page)
        data_List = get_data_list(results['result'])
        for data in data_List:
            count += int(str(data['value']).strip())
        logger.info(f' 前 {page} 页数字相加之和为: {count}')
