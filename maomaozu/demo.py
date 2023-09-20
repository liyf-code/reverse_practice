# _*_ coding: utf-8 _*_
# @Date:  5:07 下午
# @File: demo.py
# @Author: liyf

import time
import requests

from utils import *

ctx = Utils(js_file_name='demo.js').read_js_file()


def get_data(page, encrypt_data):
    if page:
        return ctx.call('get_encrypt_params', page)
    return ctx.call('get_decrypt_res', encrypt_data)


def get_encrypt_res(page):
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    }
    encrypt_para = get_data(page=page, encrypt_data=None)
    logger.info(f'第{page}页，加密参数: {encrypt_para}')
    response = requests.post('https://www.maomaozu.com/index/build.json', headers=headers, data=encrypt_para)
    return response.text


def parse(page):
    encrypt_data = get_encrypt_res(page)
    decrypt_data = get_data(page=None, encrypt_data=encrypt_data)
    data_list = decrypt_data['list']
    for data in data_list:
        title = data['Name']
        address = data['Address']
        addr = '-'.join(address[0: 2])
        walk_time = address[-1]
        nearby_line = data['Line']
        line = ', '.join(nearby_line)
        update_str = data['UpdateTimeStr']
        update_ts = data['UpdateTime']
        update_time = time.strftime("%Y-%m-%d", time.localtime(update_ts))
        room_list = data['RoomList']
        area_list = [f'{room[0]} m²' for room in room_list]
        area = ' | '.join(area_list)
        price = data['Price']
        price_str = f'¥{price}/m² · 天'
        print(
            f'标题: {title}\n地址: {addr}, 步行 {walk_time} 分钟到\n附近地铁: {line}\n更新时间: {update_str}, {update_time}\n面积: {area}\n价格: {price_str}')
        print('===' * 30)


if __name__ == '__main__':
    for page in range(1, 10):
        parse(page)
