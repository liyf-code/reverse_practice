# _*_ coding: utf-8 _*_
# @Date:  6:25 下午
# @File: demo.py
# @Author: liyf

import execjs
import requests

from loguru import logger

with open('demo.js', 'r') as f:
    js_str = f.readlines()
ctx = execjs.compile(''.join(js_str))


def get_decrypt(page, encrypt_data):
    if page:
        return ctx.call('get_encrypt_params', page)
    return ctx.call('get_decrypt_data', encrypt_data)


def get_encrypt_results(page):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Ali-Version': '7.6.15',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json; charset=UTF-8',
        'Origin': 'https://hsddcx.wsjkw.zj.gov.cn',
        'Pragma': 'no-cache',
        'Referer': 'https://hsddcx.wsjkw.zj.gov.cn/webapp/app-mobile/epidMap',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'channel': 'H5',
        'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'x-resp-encrypt': '1',
    }
    data = get_decrypt(page, encrypt_data=None)
    logger.info(f'第 {page} 页加密参数: {data}')
    response = requests.post('https://hsddcx.wsjkw.zj.gov.cn/client-api/search/getNucleicAcidOrgList', headers=headers,
                             data=data)
    return response.text


def parse(encrypt_data):
    results = get_decrypt(page=None, encrypt_data=encrypt_data)
    t_res = results['result']['t']
    data_list = t_res['data']
    for data in data_list:
        name = data['orgName']
        address = data['address']
        level = data['levelName']
        phone = data['phone'] if data['phone'] else '未知'
        is_free = data['isFree']
        res_free = True if is_free == 1 else False
        work_time = data['workTime']
        status = data['serviceStatus']
        res = '畅通' if status == 2 else '休息'
        print(f'名称: {name}\n电话: {phone}\n地址: {address}\n级别: {level}\n是否免费: {res_free}\n工作时间: {work_time}\n当前状态: {res}')
        print('===' * 25)

    # 下一页逻辑，循环入口
    is_next_page = t_res['hasNextPage']
    cur_page = t_res['pageNum']
    if is_next_page:
        next_page = t_res['nextPage']
        logger.info(f'有下一页, 当前页码: {cur_page}, 下一页: {next_page}')
        encrypt_data = get_encrypt_results(next_page)
        parse(encrypt_data)
    else:
        logger.info(f'没有下一页了，最后一页: {cur_page}')
        return


if __name__ == '__main__':
    # 脚本启动入口
    encrypt_data = get_encrypt_results(1)
    parse(encrypt_data)
