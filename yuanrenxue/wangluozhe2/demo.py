# _*_ coding: utf-8 _*_
# @Date:  10:55 上午
# @File: demo.py
# @Author: liyf

import requests

from utils import *

ctx = Utils(js_file_name='demo.js').read_js_file()
headers = {
    "authority": "wangluozhe.com",
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "session": "21ccbbfc-d378-446a-9ab3-335d00344df0.08Ft_EA-0fD2Ae6LYWysllGyZTA",
}


def get_signature():
    signature = ctx.call('get_signature')
    return signature


def get_results(page):
    url = "https://wangluozhe.com/challenge/api/2"
    signature = get_signature()
    logger.info(f'第{page}页, signature: {signature}')
    data = {
        "page": str(page),
        "count": "10",
        "_signature": signature
    }
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    return response.json()


def main():
    count = 0
    for page in range(1, 101):
        results = get_results(page)
        page_count = sum(res['value'] for res in results['data'])
        count += page_count
        logger.info(f'前{page}页之和为: {count}')  # 答案为: 5186861


if __name__ == '__main__':
    main()
