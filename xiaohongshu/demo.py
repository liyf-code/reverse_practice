# _*_ coding: utf-8 _*_
# @Date:  2:01 下午
# @File: demo.py
# @Author: liyf

import hashlib
import requests

from loguru import logger


def get_sign(str) -> str:
    md5 = hashlib.md5()
    md5.update(str.encode('utf8'))
    return md5.hexdigest()


def get_results(page: str):
    url_fix = f'/fe_api/sns/v1/idol_ratings/hot_notes?page={page}&num=20WSUDD'
    sign = get_sign(url_fix)
    logger.info(f'第 {page} 页: X{sign}')
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Proxy-Connection': 'keep-alive',
        'Referer': 'http://www.xiaohongshu.com/referral/starrank/rank?naviHidden=yes',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'X-Sign': f'X{sign}',
    }
    params = {
        'page': page,
        'num': '20',
    }
    response = requests.get('http://www.xiaohongshu.com/fe_api/sns/v1/idol_ratings/hot_notes', params=params,
                            headers=headers, verify=False)
    return response.json()


def parse():
    for page in range(1, 20):
        results = get_results(str(page))
        data_list = results['data']
        for data in data_list:
            u_id = data['id']
            title = data['display_title']
            author = data['user']['nickname']
            likes = data['likes']
            desc = data['desc']
            print(f'id: {u_id}\n标题: {title}\n作者: {author}\n点赞数: {likes}\n正文内容: {desc.strip()}')
            print('===' * 35)


if __name__ == '__main__':
    parse()
