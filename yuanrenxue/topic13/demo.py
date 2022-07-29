# _*_ coding: utf-8 _*_
# @Date:  1:31 下午
# @File: demo.py
# @Author: liyf
import os

import base64
import requests

from loguru import logger
from fontTools.ttLib import TTFont


def get_results(page):
    headers = {
        'authority': 'www.python-spider.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }

    data = {
        'page': page,
    }

    response = requests.post('https://www.python-spider.com/api/challenge13', headers=headers, data=data)
    return response.json()


def parse_woff(page, woff):
    # base64解码，并保存为tff文件格式
    b = base64.b64decode(woff)
    woff_name = f'topic13_{page}.woff'
    xml_name = f'topic13_{page}.xml'
    with open(woff_name, 'wb') as f:
        f.write(b)
        f.close()
    font = TTFont(woff_name)
    font.saveXML(xml_name)
    extraNames = font.get('post').__dict__['extraNames']
    woff_dict = {
        val.replace('uni', '&#x'): 0 if index >= 9 else index + 1
        for index, val in enumerate(extraNames)
    }
    os.remove(woff_name)
    os.remove(xml_name)
    logger.info(f'已删除文件: {woff_name} 和 {xml_name}')
    return woff_dict


def parse():
    count = 0
    for page in range(1, 101):
        results = get_results(page)
        woff = results['woff']
        woff_dict = parse_woff(page, woff)
        datas = results['data']
        for data in datas:
            count += int(''.join([f'{woff_dict[key]}' for key in data['value'].strip().split(' ')]))
        logger.info(f'前 {page} 页之和为: {count}')
        logger.info('***' * 20)


if __name__ == '__main__':
    # 答案: 4943577
    parse()
