# _*_ coding: utf-8 _*_
# @Date:  2:53 下午
# @File: demo.py
# @Author: liyf

import json
import requests

from utils import *


def get_decrypt_data(encrypt_data):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return json.loads(ctx.call('decryptByDES', encrypt_data))


def get_results(page):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Origin': 'http://ctbpsp.com',
        'Referer': 'http://ctbpsp.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    }

    response = requests.get(
        f'https://custominfo.cebpubservice.com/cutominfoapi/recommand/type/5/pagesize/10/currentpage/{page}',
        headers=headers)
    return response.text


def parse():
    for page in range(1, 31):
        encrypt_data = get_results(page)
        # solve error: execjs._exceptions.ProgramError: Error: Malformed UTF-8 data
        # 把返回的加密数据进行strip('"')操作
        decrypt_data = get_decrypt_data(encrypt_data.strip('"'))
        data_list = decrypt_data['data']['dataList']
        for data in data_list:
            title = data['noticeName']
            province = data['reginProvince']
            bulletin_type = data['bulletinTypeName']
            accept_time = data['noticeSendTime']
            uuid = data['bulletinID']
            detail_url = f'http://ctbpsp.com/#/bulletinDetail?uuid={uuid}&inpvalue=&dataSource=0'
            print(
                f'标题: {title}\n公告类型: {bulletin_type}\n省份: {province}\n接收时间: {accept_time}\n详情url地址: {detail_url}')
            print('===' * 30)


if __name__ == '__main__':
    parse()
