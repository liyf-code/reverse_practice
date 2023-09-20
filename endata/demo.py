# _*_ coding: utf-8 _*_
# @Date:  4:42 下午
# @File: demo.py
# @Author: liyf
import json
import requests

from utils import *


def get_results(params):
    headers = {
        'Accept': 'text/plain, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.endata.com.cn',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
    }

    data = {
        'startTime': params,
        'MethodName': 'BoxOffice_GetMonthBox',
    }

    response = requests.post('https://www.endata.com.cn/API/GetData.ashx', headers=headers, data=data)
    return response.text


def get_decrypt_data(encrypt_data):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('webInstace.shell', encrypt_data)


def parse():
    time_list = ['2021-12-01', '2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01', '2022-06-01',
                 '2022-07-01', '2022-08-01', '2022-09-01']
    for params in time_list:
        results = get_results(params)
        decrypt_data = json.loads(get_decrypt_data(results))
        data_list = decrypt_data['Data']['Table']
        ymd_list = params.split('-')
        logger.info(f'{ymd_list[0]} 年 {ymd_list[1]} 月份票房数据如下:')
        for data in data_list:
            ranking = data['Irank']
            m_name = data['MovieName']
            r_time = data['releaseTime']
            boxoffice = data['boxoffice']
            avgboxoffice = data['avgboxoffice']
            avgshowcount = data['avgshowcount']
            box_pro = data['box_pro']
            detail_url = f'https://www.endata.com.cn/BoxOffice/MovieStock/movieShow.html?id={data["EnMovieID"]}'
            print(
                f'排序: {ranking}\n电影名称: {m_name}\n上映时间: {r_time}\n单月票房（万）: {boxoffice}\n平均票价: {avgboxoffice}\n场均人次: {avgshowcount}\n月度占比: {box_pro}%\n详情地址: {detail_url}')
            print('===' * 30)


if __name__ == '__main__':
    parse()
