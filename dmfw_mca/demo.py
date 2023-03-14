# _*_ coding: utf-8 _*_
# @Date:  5:18 下午
# @File: demo.py
# @Author: liyf

'''
todo changelog 20230314
接口变更
  - https://dmfw.mca.gov.cn/9095/stname/list 改变为 https://dmfw.mca.gov.cn/stname/listPub
  - 请求参数不变和请求方法都不变
响应数据变更
  - 原接口 https://dmfw.mca.gov.cn/9095/stname/list 响应数据为密文，需要解密
  - 新街口 https://dmfw.mca.gov.cn/stname/listPub 响应数据为明文

'''

import execjs
import requests

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://dmfw.mca.gov.cn',
    'Referer': 'https://dmfw.mca.gov.cn/online/map.html',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
}


def get_encrypt_data(keyword):
    data = {
        'type': 'place',
        'stName': keyword,
        'placeTypeCode': '',
        'placeTypeCodeLen': '0',
        'code': '',
        'adminCodeLen': '0',
        'year': '2022',
        'searchType': '模糊',
        'page': '1',
        'size': '10',
    }
    response = requests.post('https://dmfw.mca.gov.cn/9095/stname/list', headers=headers, data=data)
    return response.text


def get_content(keyword):
    encrypt_data = get_encrypt_data(keyword)
    content = encrypt_data[0:-6]
    code = encrypt_data[-6:]
    return content, code


def get_str(code):
    data = {
        'code': code,
    }
    response = requests.post('https://dmfw.mca.gov.cn/9095/stname/keys/get.html', headers=headers,
                             data=data)
    return response.text


def get_decrypt_data(content, strs):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    decrypt_data = ctx.call('decryptByDES', content, strs)
    return decrypt_data


def parse():
    while True:
        keyword = input('请输入关键字:')
        content, code = get_content(keyword)
        strs = get_str(code)
        decrypt_data = get_decrypt_data(content, strs)
        records = decrypt_data['records']
        if not records:
            print(f'该关键字 (`{keyword}`) 下没有数据')
            print(f'===' * 20)
        for record in records:
            title = record['standard_name']
            province = record['province_name']
            city = record['city_name']
            area_name = record['area_name']
            pca = f'{province}-{city}-{area_name}'
            place_type = record['place_type']
            print(f'搜索关键字: {keyword}\n标准名称: {title}\n地址: {pca}\n地区所属类型: {place_type}')
            print('===' * 20)


if __name__ == '__main__':
    parse()
