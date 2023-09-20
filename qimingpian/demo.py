# _*_ coding: utf-8 _*_
# @Date:  2:45 下午
# @File: demo.py
# @Author: liyf

import requests

from utils import *


def get_encrypt_data():
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Origin': 'https://www.qimingpian.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
    }

    data = {
        'tag': '',
        'unionid': '',
    }

    response = requests.post('https://vipapi.qimingpian.cn/DataList/productListVip', headers=headers, data=data).json()
    encrypt_data = response['encrypt_data']
    return encrypt_data


def get_decrypt_data(encrypt_data):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    results = ctx.call('s', encrypt_data)
    data_list = results['list']
    for data in data_list:
        investor_info = data['investor_info']
        investors = '、'.join([investor['investor'] for investor in investor_info])
        print(
            f'项目: {data["product"]}\n业务: {data["yewu"]}\n行业领域: {data["hangye1"]}\n地区: {data["province"]}\n投资轮次: {data["lunci"]}\n投资时间: {data["time"]}\n投资金额: {data["money"]}\n投资方: {investors}')
        print('***' * 40)


if __name__ == '__main__':
    encrypt_data = get_encrypt_data()
    get_decrypt_data(encrypt_data)
