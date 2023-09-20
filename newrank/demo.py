# _*_ coding: utf-8 _*_
# @Date:  4:13 下午
# @File: demo.py
# @Author: liyf

import js2py
import requests

from utils import *


def get_nonce():
    js_str = """
    function get_nonce() {
        for (var a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], b = 0; b < 500; b++)
            for (var c = "", d = 0; d < 9; d++) {
                var e = Math.floor(16 * Math.random());
                c += a[e]
            }
        return c
    }
    """
    context = js2py.EvalJs()  # 实例化解析js对象
    context.execute(js_str)  # js对象转python
    nonce = context.get_nonce()  # 调用js中的get_nonce，没有传参
    return nonce


def get_xyz(h):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('b', h)


def get_results(page):
    headers = {
        'authority': 'www.newrank.cn',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://www.newrank.cn',
        'referer': 'https://www.newrank.cn/public/news.html',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }
    nonce = get_nonce()
    h = f'/xdnphb/index/getMedia?AppKey=joker&keyword=&pageNumber={page}&pageSize=10&nonce={nonce}'
    xyz = get_xyz(h)
    logger.info({'nonce': nonce, 'xyz': xyz})
    data = {
        'keyword': '',
        'pageNumber': str(page),
        'pageSize': '10',
        'nonce': nonce,
        'xyz': xyz,
    }  # 请求携带的data参数，缺一不可
    response = requests.post('https://www.newrank.cn/xdnphb/index/getMedia', headers=headers, data=data)
    return response.json()


def parse():
    for page in range(1, 100):
        results = get_results(page)
        data_list = results['value']
        for data in data_list:
            title = data['title']
            desc = data['summary']
            label = data['label']
            author = data['author']
            public_time = data['public_time']
            url = data['url']
            print(f'标题: {title}\n描述: {desc}\n标签: {label}\n作者: {author}\n更新时间: {public_time}\n详情页地址: {url}')
            print('***' * 30)


if __name__ == '__main__':
    # https://www.newrank.cn/public/news.html
    parse()
