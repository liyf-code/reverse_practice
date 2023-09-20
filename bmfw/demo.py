# _*_ coding: utf-8 _*_
# @Date:  11:34 上午
# @File: demo.py
# @Author: liyf

'''
网站：http://bmfw.www.gov.cn/hsjcjgcx/index.html?ADTAG=feiyanh5&adcode=440000
接口：http://bmfw.www.gov.cn/bjww/interface/interfaceJson
请求方式：post
需要逆向的参数
-请求头部分，缺一不可
    - x-wif-timestamp   长度为10位的时间戳
    - x-wif-signature   SHA256加密
    - x-wif-paasid  定值: `smt-application`
    - x-wif-nonce   定值: `QkjjtiLM2dCratiA`
- 请求参数部分，缺一不可
    - paasHeader    定值: `zdww`
    - timestampHeader   长度为10位的时间戳
    - signatureHeader   SHA256加密
    - nonceHeader   定值: `123456789abcdefg`

全局搜索关键字 `signatureHeader`，只有一个js文件，即可定位到加密位置

而且，在该js文件中，请求头中的加密参数和发送post请求所携带的参数的加密，都能在该js文件中找到

把关键的js代码copy至本地，复现加密逻辑，生成加密参数即可
'''

import time
import requests

from utils import *

ctx = Utils(js_file_name='demo.js').read_js_file()


def get_encrypt_data(params, timestamp):
    if params:
        return ctx.call('generateAjaxParmas', params, timestamp)
    else:
        return ctx.call('get_headers_params', timestamp)


def get_results(page):
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    }
    json_data = {
        "code": "",
        "serach_key": "",
        "page": page,
        "appId": "NcApplication",
        "key": "818461bc617bb175b8c2b87d6bf1bb07",
        "page_size": "4"
    }
    ts = str(int(time.time()))
    encrypt_header = get_encrypt_data(params=None, timestamp=ts)
    headers['x-wif-nonce'] = encrypt_header['x-wif-nonce']
    headers['x-wif-paasid'] = encrypt_header['x-wif-paasid']
    headers['x-wif-signature'] = encrypt_header['x-wif-signature']
    headers['x-wif-timestamp'] = encrypt_header['x-wif-timestamp']

    encrypt_params = get_encrypt_data(params=json_data, timestamp=ts)
    json_data['paasHeader'] = encrypt_params['paasHeader']
    json_data['timestampHeader'] = encrypt_params['timestampHeader']
    json_data['nonceHeader'] = encrypt_params['nonceHeader']
    json_data['signatureHeader'] = encrypt_params['signatureHeader']
    response = requests.post('http://bmfw.www.gov.cn/bjww/interface/interfaceJson', headers=headers, json=json_data,
                             verify=False)
    return response.json()


def parse():
    for page in range(1, 10):
        res = get_results(page)
        data_list = res['data']['list']
        for data in data_list:
            name = data['name']
            phone = data['phone']
            address = data['address']
            area_address = data['area_address']
            print(f'机构名称: {name}\n联系电话: {phone}\n所在区县: {area_address}\n机构地址: {address}')
            print('===' * 20)


if __name__ == '__main__':
    parse()
