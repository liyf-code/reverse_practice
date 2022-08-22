# _*_ coding: utf-8 _*_
# @Date:  6:03 下午
# @File: demo.py
# @Author: liyf

"""
todo:
    - 网站: https://www.xiniudata.com/industry/newest?from=data
    - 数据接口: https://www.xiniudata.com/api2/service/x_service/person_industry_list/list_industries_by_sort ，post请求，请求参数 payload, sig

changelog 20220819
该网站有两处需要进行破解
1. 请求参数 payload 和 sig
    - 定位参数加密位置。使用常规的全局搜索这两个参数，搜索到的结果太多，不太好分析。此时我们采用 XHR 断点进行分析。
    - '/person_industry_list/list_industries_by_sort'，下拉刷新数据，xhr断点生效。
    - 此时在断点生效的这个js文件中，第19090到19093行，会发现以下代码
        todo
            '''
                var f = Object(c.c)(Object(c.d)(JSON.stringify(l.payload)))
                  , p = Object(c.e)(f);
                l.payload = f,
                l.sig = p
            '''
    - 该地方就是请求参数的加密位置
    - 扣js代码，缺啥补啥，此时生成的是payload参数
    - sig参数的加密逻辑
        - 对 `payload + W5D80NFZHAYB8EUI2T649RT2MNRMVE2O` 组成的字符串进行md5加密，取大写
        - 经过测试，大写和小写都行，无所谓
        - 不过为了和接口里边的请求参数形式一致，还是取大写
2. 接口返回的数据是加密后的，需要解密
    - 还是在xhr断点生效的这个js文件中，第19113和19115行发现以下代码
        todo
            '''
                var d = Object(c.a)(l)
                  , y = Object(c.b)(d)
                  , v = JSON.parse(y);
            '''
    - 此时，v 就是解密后的数据
"""

import json
import execjs
import hashlib
import requests

from loguru import logger


def get_data(start, encrypt_data):
    """
    解析js文件，当 encrypt_data 不存在时，说明start存在，此时解析请求参数payload；
    当 start 不存在时，说明encrypt_data存在，此时对返回数据解密进行解析
    :param start: 解析参数payload时，需要的参数
    :param encrypt_data: 返回结果解密，需要的参数
    :return: result
    """
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    if not encrypt_data:
        callback = 'get_payload'
        params = start
    else:
        callback = 'get_decrypt_data'
        params = encrypt_data
    return ctx.call(str(callback), params)


def get_sig(n) -> str:
    md5 = hashlib.md5()
    md5.update(n.encode('utf8'))
    return md5.hexdigest()


def get_results(page, start):
    headers = {
        'authority': 'www.xiniudata.com',
        'accept': 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9',
        'origin': 'https://www.xiniudata.com',
        'pragma': 'no-cache',
        'referer': 'https://www.xiniudata.com/industry/newest?from=data',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    }
    payload = get_data(start=start, encrypt_data=None)
    sig = get_sig(f'{payload}W5D80NFZHAYB8EUI2T649RT2MNRMVE2O')
    params_dict = {'payload': payload, 'sig': sig}
    logger.info(f'第 {page + 1} 页: {params_dict}')
    # 请求参数，缺一不可
    json_data = {
        'payload': payload,
        'sig': sig.upper(),
        'v': 1,
    }

    response = requests.post(
        'https://www.xiniudata.com/api2/service/x_service/person_industry_list/list_industries_by_sort',
        headers=headers, json=json_data)
    return response.json()


def parse():
    for page in range(0, 10):
        start = page * 20
        results = get_results(page, start)
        decrypt_data = get_data(start=None, encrypt_data=results['d'])
        encrypt_data_json = json.loads(decrypt_data)
        data_list = encrypt_data_json['list']
        for data in data_list:
            name = data['name']
            compant_count = data['countCompany']
            event = data['event']
            companyVOs = ', '.join([item['name'] for item in data['companyVOs']])
            update_time = data['updateTime']
            print(f'赛道(数量): {name}({compant_count}) || {event}\n最近获投: {companyVOs}\n最近更新: {update_time}')
            print('===' * 35)


if __name__ == '__main__':
    parse()
