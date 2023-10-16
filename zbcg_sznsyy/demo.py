# _*_ coding: utf-8 _*_
# @Date:  10:16 上午
# @File: demo.py
# @Author: liyf

'''

主页: https://zbcg.sznsyy.cn/homeNotice

加密
    - 请求参数加密
    - 响应数据加密
    - 详情页参数 epcos 加密

知识点
    - AES、RSA

入门难度
'''

import os
import json
import execjs
import requests

from datetime import datetime
from loguru import logger

f = open('demo.js', 'r')
js_str = f.readlines()
ctx = execjs.compile(''.join(js_str))

dir = 'pdf_dirs'
if not os.path.exists(dir):
    os.mkdir(dir)

url = "https://zbcg.sznsyy.cn/sz/purchaser/public/frontPageAnnouncementList"

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
}


def convert_datetime_format(timestamp):
    # 解析原始时间字符串
    dt = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S.%f%z")
    # 转换为目标格式的字符串
    formatted_dt = dt.strftime("%Y-%m-%d %H:%M:%S")
    return formatted_dt


def get_params_decrypt(payload, encrypt_str, aeskey, params):
    '''
    解析js文件，获取接口请求需要的参数或者解密的结果
    :param payload: 未加密的原始请求参数
    :param encrypt_str: 接口响应的加密的数据
    :param aeskey: 接口响应的aeskey
    :param params: 获取下载链接的参数epcos
    :return: 根据接收的不同参数，返回相应的数据
    '''
    if payload:
        return ctx.call('get_params', payload)
    if params:
        return ctx.call('get_epcos', params)
    return ctx.call('decrypt', encrypt_str, aeskey)


def get_results(payload):
    data = get_params_decrypt(payload, encrypt_str=None, aeskey=None, params=None)
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)
    return response.json()


def get_data(page):
    payload = {
        "noticeName": None,
        "pageNum": page,
        "pageSize": 10,
        "tenderCategory": "6",
        "noticeType": None,
        "tenderClass": None
    }
    results = get_results(payload)
    aeskey = results['aesKey']
    encrypt_str = results['content']
    decrypt_res = get_params_decrypt(payload=None, encrypt_str=encrypt_str, aeskey=aeskey, params=None)
    rows = decrypt_res['data']['rows']
    for row in rows:
        ts = row['publishTime']
        item = {
            'title': row['bulletinName'],
            'publish_time': convert_datetime_format(ts),
            'notice_type': row['noticeType'],
            'middle_id': row['middleId']
        }
        parse_detail(item)


def get_detail_res(params, url, pdf_name):
    info = get_params_decrypt(payload=None, encrypt_str=None, aeskey=None, params=params)
    headers['Aeskey'] = info['aes_key']
    params = {
        "epcos": info['epcos']
    }
    response = requests.get(url, headers=headers, params=params)
    if 'download' in url:
        with open(f"{dir}/{pdf_name}.pdf", "wb") as f:
            f.write(response.content)
    else:
        return response.json()


def parse_detail(item):
    notice_type = item['notice_type']
    middle_id = item['middle_id']
    para1 = f'noticeType={notice_type}&middleId={middle_id}'
    results = get_detail_res(para1, 'https://zbcg.sznsyy.cn/sz/purchaser/public/getBulletinDetailInfo',
                             pdf_name=None)
    aeskey = results['aesKey']
    encrypt_str = results['content']
    decrypt_res = get_params_decrypt(payload=None, encrypt_str=encrypt_str, aeskey=aeskey, params=None)
    file_key = decrypt_res['data']['announcementKey']
    para2 = f'fileKey={file_key}'
    logger.info(para2)
    get_detail_res(para2, 'https://zbcg.sznsyy.cn/sz/file/download', pdf_name=item['title'])
    logger.success(f'{item["title"]} 下载成功')


def main():
    payload = {
        "noticeName": None,
        "pageNum": 1,
        "pageSize": 10,
        "tenderCategory": "6",
        "noticeType": None,
        "tenderClass": None
    }
    results = get_results(payload)
    aeskey = results['aesKey']
    encrypt_str = results['content']
    decrypt_res = get_params_decrypt(payload=None, encrypt_str=encrypt_str, aeskey=aeskey, params=None)
    total_count = decrypt_res['data']['total']
    total_page = int(total_count) // 10 if int(total_count) % 10 == 0 else int(total_count) // 10 + 1
    logger.info(f'共获取到 {total_count} 条数据, 共 {total_page} 页')
    for page in range(1, total_page + 1):
        get_data(page)
        logger.success(f'当前进度（已爬取页码/总页码）: {page} / {total_page}')
        break


if __name__ == '__main__':
    main()
