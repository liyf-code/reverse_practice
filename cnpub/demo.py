# _*_ coding: utf-8 _*_
# @Date:  3:46 下午
# @File: demo.py
# @Author: liyf

'''
标准aes加密解密
'''

import execjs
import requests

from loguru import logger

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://cnpub.com.cn",
    "Referer": "https://cnpub.com.cn/information.html",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
}
url = "https://cnpub.com.cn/prod-api/api/index/newsList"

f = open('demo.js', 'r', encoding='utf8')
js_str = f.read()
ctx = execjs.compile(''.join(js_str))


def get_para_data(para, encrypt_data):
    if para:
        return ctx.call('get_encrypt_params', para)
    return ctx.call('get_decrypt_data', encrypt_data)


def get_results(page):
    para = {
        "newsType": 1,
        "pageNum": page,
        "pageSize": 10,
        "title": ""
    }
    data = get_para_data(para=para, encrypt_data=None)
    logger.info(f'第 {page} 页加密参数: {data}')
    response = requests.post(url, headers=headers, data=data)
    return str(response.text).strip('"')


def parse_data(page):
    encrypt_data = get_results(page)
    decrypt_data = get_para_data(para=None, encrypt_data=encrypt_data)
    rows = decrypt_data['list']['rows']
    for row in rows:
        title = row['title']
        author = row['author']
        origin = row['platformName']
        update_time = row['publishTime']
        print(f'标题: {title}\n作者: {author}\n出自: {origin}\n更新时间: {update_time}')
        print('***' * 25)


def main():
    for page in range(1, 10):
        parse_data(page)
        print('===' * 30)


if __name__ == '__main__':
    main()
