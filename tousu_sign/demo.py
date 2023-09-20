# _*_ coding: utf-8 _*_
# @Date:  4:55 下午
# @File: demo.py
# @Author: liyf

import time
import requests

from utils import *


def get_req_params(page):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('get_signature', page)


def ts2time(ts):
    time_local = time.localtime(ts)
    dt = time.strftime("%Y-%m-%d", time_local)
    return dt


def get_results(page):
    headers = {
        'accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }
    req_params = get_req_params(page)
    params = {
        'ts': req_params['ts'],
        'rs': req_params['rs'],
        'signature': req_params['signature'],
        'couid': '6384912431',
        'sid': '26873',
        'page_size': '10',
        'page': str(page),
    }
    response = requests.get('https://tousu.sina.com.cn/api/company/service_complaints', params=params, headers=headers)
    return response.json()


def parse():
    for page in range(1, 20):
        results = get_results(page)
        data_list = results['result']['data']['complaints']
        for data in data_list:
            title = data['main']['title']
            cotitle = data['main']['cotitle']
            appeal = data['main']['appeal']
            dz = data['main']['upvote_amount']
            zf = data['main']['share_amount']
            pl = data['main']['comment_amount']
            summary = data['main']['summary']
            author = data['author']['title'] if 'title' in data['author'].keys() else '未知'
            ts = data['main']['timestamp']
            # dt = ts2time(int(ts))
            print(
                f'标题: {title}\n投诉人: {author} 在 {ts} 于黑猫投诉平台发起\n投诉对象: {cotitle}\n投诉要求: {appeal}\n投诉内容: {summary}\n点赞数（{dz}）评论数（{pl}）转发数（{zf}）')
            print('===' * 35)


if __name__ == '__main__':
    parse()
