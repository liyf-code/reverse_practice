# _*_ coding: utf-8 _*_
# @Date:  5:56 下午
# @File: demo.py
# @Author: liyf

import time
import requests

from utils import *


def get_apikey():
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('getApiKey')


def get_json_data():
    url = f'https://www.oklink.com/api/explorer/v1/btc/transactionsNoRestrict?t={str(int(time.time()) * 1000)}&limit=20&offset=0'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'x-apiKey': get_apikey()
    }
    response = requests.get(url, headers=headers)
    return response.json()


def parse():
    result = get_json_data()
    data_list = result['data']['hits']
    for data in data_list:
        print(
            f'交易哈希: {data["hash"]}\n所在区块: {data["blockHeight"]}\n输入: {data["inputsCount"]}\n输出: {data["outputsCount"]}\n数量(BTC): {data["realTransferValue"]}')
        print('***' * 30)


if __name__ == '__main__':
    parse()
