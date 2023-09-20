# _*_ coding: utf-8 _*_
# @Date:  3:15 下午
# @File: demo.py
# @Author: liyf


"""
todo changelog version 20230314
- 接口变更
  - 原接口：      http://jzsc.mohurd.gov.cn/api/webApi/dataservice/query/comp/list
  - 变更后的接口： https://jzsc.mohurd.gov.cn/Api/webApi/dataservice/query/comp/list

todo: http://jzsc.mohurd.gov.cn/data/company
由于是破解该网站返回数据加密的过程，所以可以根据关键字 `decrypt` 搜索进行定位关键代码。在`app.xxx.js`中可以定位到解密位置，打断点，点击下一页，断点生效。
把解密的函数copy下来，缺啥补啥。
"""

import json
import requests

from utils import *


def get_decrypt_data(encrypt_data):
    """
    调用js，传入需要解密的数据，返回解密后的数据
    :param encrypt_data: 需要解密的数据
    :return: 解密后的数据
    """
    ctx = Utils(js_file_name='demo.js').read_js_file()
    decrypt_data = ctx.call('get_encrypt_data', encrypt_data)
    return json.loads(decrypt_data)


def get_encrypt_data(page):
    """
    获取数据
    :param page: 页码
    :return:
    """
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'http://jzsc.mohurd.gov.cn/data/company',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        'timeout': '30000',
    }
    params = {
        'pg': str(page),
        'pgsz': '15',
        'total': '450',
    }
    response = requests.get('https://jzsc.mohurd.gov.cn/APi/webApi/dataservice/query/comp/list', params=params,
                            headers=headers)
    return response.text


def parse():
    for page in range(0, 30):
        logger.info(f'正在抓取第 {page + 1} 页数据...')
        encrypt_data = get_encrypt_data(page)
        decrypt_data = get_decrypt_data(encrypt_data)
        data_list = decrypt_data['data']['list']
        for data in data_list:
            org_code = data['QY_ORG_CODE']
            coname = data['QY_NAME']
            try:
                faren = data['QY_FR_NAME']
            except KeyError:
                faren = None
            address = data['QY_REGION_NAME']
            print(f'统一社会信用代码: {org_code}\n企业名称: {coname}\n企业法定代表人: {faren}\n企业注册属地: {address}')
            print('===' * 20)


if __name__ == '__main__':
    parse()
