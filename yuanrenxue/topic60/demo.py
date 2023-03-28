# _*_ coding: utf-8 _*_
# @Date:  2:42 下午
# @File: demo.py
# @Author: liyf

"""
3DES加密
ECB模式，Pkcs7填充方式
"""
import requests

from utils import *


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
    des_data = get_jiami(page)
    url = f'https://www.python-spider.com/api/challenge60/{des_data}'
    response = requests.post(url, headers=headers, data=data)
    return response.json()


def get_jiami(page):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('get_data', page)


def parse():
    count = 0
    for page in range(1, 101):
        results = get_results(str(page))
        data_list = results['data']
        for data in data_list:
            count += int(str(data['value']).strip())
        logger.info(f'前 {page} 页之和为: {count}')
    logger.info(f'本题答案为: {count}')  # 本题答案为: 5004204


if __name__ == '__main__':
    parse()
