# _*_ coding: utf-8 _*_
# @Date:  11:23 上午
# @File: demo.py
# @Author: liyf

"""
post请求中的 token 参数破解
对 页码 进行md5加密，并取16位
"""

import requests
import hashlib

from loguru import logger


def get_page_md5(page: str):
    md5 = hashlib.md5()
    md5.update(page.encode('utf8'))
    return md5.hexdigest()[8:-8].lower()


def get_html(page):
    headers = {
        'authority': 'www.python-spider.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'origin': 'https://www.python-spider.com',
        'referer': 'https://www.python-spider.com/challenge/58',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }
    data = {
        'page': page,
        'token': get_page_md5(str(page)),
    }
    response = requests.post('https://www.python-spider.com/api/challenge58', headers=headers, data=data)
    return response.json()


def get_total_res_sum():
    count = 0
    for page in range(1, 101):
        results = get_html(page)
        for res in results['data']:
            count += int(str(res['value']).strip())
        logger.info(f'前 {page} 页之和为: {count}')


if __name__ == '__main__':
    # 答案: 4994898
    get_total_res_sum()
