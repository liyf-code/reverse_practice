# _*_ coding: utf-8 _*_
# @Date:  5:57 下午
# @File: demo.py
# @Author: liyf

import execjs
import requests

from loguru import logger

f = open('demo.js', 'r')
js_str = f.read()
ctx = execjs.compile(''.join(js_str))

headers = {
    "authority": "api.weibotop.cn",
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}


def get_timeid_dec_data(timeid, encrypt_data):
    if timeid:
        return ctx.call('l', timeid)
    return ctx.call('h', encrypt_data)


def get_latest_date():
    '''
    获取最新一次的热搜日期
    :return:
    '''
    url = "https://api.weibotop.cn/getlatest"
    response = requests.get(url, headers=headers)
    return response.json()


def get_data(timeid):
    url = "https://api.weibotop.cn/currentitems"
    enc_timeid = get_timeid_dec_data(timeid, encrypt_data=None)
    logger.info(f'timeid: {enc_timeid}')
    params = {
        "timeid": enc_timeid
    }
    response = requests.get(url, headers=headers, params=params)
    return response.text


def main():
    latest_res = get_latest_date()
    timeid = latest_res[0]
    latest_date = latest_res[1]
    logger.info(f'最近一次更新日期为: {latest_date}')
    encrypt_data = get_data(timeid)
    decrypt_data = get_timeid_dec_data(timeid=None, encrypt_data=encrypt_data)
    for data in decrypt_data:
        title = data[0]
        rank_list_date = data[1]
        last_rank_list = data[2]
        heat = data[3]
        print(f'热搜名称: {title}\n上榜时间: {rank_list_date}\n最后在榜: {last_rank_list}\n热度: {heat}')
        print('***' * 20)


if __name__ == '__main__':
    main()
