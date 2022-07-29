# _*_ coding: utf-8 _*_
# @Date:  2:27 下午
# @File: demo.py
# @Author: liyf

"""
js_fuck
"""

import execjs
import requests

from loguru import logger


def get_uc(page):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    return ctx.call('get_uc', page)


def get_results(page):
    headers = {
        'authority': 'www.python-spider.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }
    uc = get_uc(page)
    logger.info(f'page: {page}, uc: {uc}')
    data = {
        'page': page,
        'uc': uc
    }
    response = requests.post('https://www.python-spider.com/api/challenge14', headers=headers, data=data)
    return response.json()


if __name__ == '__main__':
    # 答案: 5175137
    count = 0
    for page in range(1, 101):
        results = get_results(page)
        data_List = results['data']
        for data in data_List:
            count += int(str(data['value']).strip())
        logger.info(f' 前 {page} 页数字相加之和为: {count}')
        logger.info('***' * 20)
