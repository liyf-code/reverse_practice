# _*_ coding: utf-8 _*_
# @Date:  3:19 下午
# @File: demo.py
# @Author: liyf

import execjs
import requests

from utils import *


def get_mcode():
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('get_mcode')


def get_results():
    """
    请求头中 `Referer` 参数不能缺，否则报错:
    {"resultmsg":"未经授权的访问,code:005","resultcode":401}
    """
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Referer': 'https://webapi.cninfo.com.cn/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'mcode': get_mcode(),
    }

    response = requests.post('https://webapi.cninfo.com.cn/api/sysapi/p_sysapi1128', headers=headers)
    return response.json()


def parse():
    records = get_results()['records']
    index = 0
    for record in records:
        index += 1
        print(
            f'序号: {index}\n证券代码: {record["SECCODE"]}\n资讯类型: {record["F003V"]}\n发布时间: {record["DECLAREDATE"]}\n资讯标题: {record["F001V"]}\n公告摘要: {record["F002V"]}')
        print('===' * 35)


if __name__ == '__main__':
    # https://webapi.cninfo.com.cn/#/aiInfos
    parse()
