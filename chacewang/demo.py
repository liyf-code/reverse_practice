# _*_ coding: utf-8 _*_
# @Date:  10:36 上午
# @File: demo.py
# @Author: liyf

'''
对查策网（https://www.chacewang.com/chanye/index#）的响应数据进行解密

打xhr断点，一步一步调试
或者搜索关键字`decrypt(`或者`JSON.parse(`也可以定位到加密位置


已完成：
- 响应数据解密已破解

未完成：
- 响应数据中的申报时间字段（start_time、end_time）进行了字体加密，未破解
'''

import requests

from utils import *


def get_encrypt_data(page: str):
    headers = {
        'authority': 'web.chace-ai.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    }
    params = {
        'page': page,
        'size': '20',
        'industry': '',
        'area': 'RegisterArea_ZXS_Shanghai',
        'dept': '',
        'partition': '',
        'pe_name': '',
        'currentArea': 'RegisterArea_ZXS_Shanghai',
        'query_date': '0',
        'full_search': '0',
        'sort_type': '0',
    }
    response = requests.get('https://web.chace-ai.com/api/ccw/project/evaluation/getList/', params=params,
                            headers=headers)
    return response.json()


def get_decrypt_data(encrypt_data):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('get_decrypt_data', encrypt_data)


def parse():
    for page in range(1, 10):
        results = get_encrypt_data(str(page))
        encrypt_data = results['data']
        decrypt_data = get_decrypt_data(encrypt_data)
        print(decrypt_data)
        break


if __name__ == '__main__':
    parse()
