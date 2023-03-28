# _*_ coding: utf-8 _*_
# @Date:  6:20 下午
# @File: demo.py
# @Author: liyf

import requests

from utils import *


def get_token(page):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('get_token', page)


def get_results(page):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'https://spa2.scrape.center/page/9',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
    }
    token = get_token(page)
    logger.info(f'当前页码: {page}, token: {token}')
    params = {
        'limit': '10',
        'offset': str((page - 1) * 10),
        'token': token,
    }
    response = requests.get('https://spa2.scrape.center/api/movie/', params=params, headers=headers)
    return response.json()


def parse():
    for page in range(1, 12):
        results = get_results(page)
        data_list = results['results']
        for data in data_list:
            name = data['name']
            tag = data['categories']
            regions = data['regions']
            score = data['score']
            minute = data['minute']
            published_at = data['published_at']
            alias = data['alias']
            print(
                f'电影名称: {name}\n别名: {alias}\n类型: {tag}\n国家: {regions}\n评分: {score}\n时长: {minute}\n上映时间: {published_at}')
            print('***' * 15)


if __name__ == '__main__':
    parse()
