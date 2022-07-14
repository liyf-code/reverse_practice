# _*_ coding: utf-8 _*_
# @Date:  5:56 下午
# @File: demo.py
# @Author: liyf

import execjs
import requests


def get_apikey():
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    return ctx.call('getApiKey')


def get_json_data():
    url = 'https://www.oklink.com/zh-cn/btc/tx-list?limit=20&pageNum=1'
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
