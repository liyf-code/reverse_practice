# _*_ coding: utf-8 _*_
# @Date:  5:06 下午
# @File: demo.py
# @Author: liyf

'''

全局搜索关键字 'decrypt(' 即可定位到关键代码

des加密

'Xinhuamm@2018' 进行md5加密得到的结果就是des的key
'''

import requests
import json
import datetime

from utils import *

headers = {
    "authority": "xhpfmapi.zhongguowangshi.com",
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json;charset=UTF-8",  # 必须携带该请求头
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}

ctx = Utils(js_file_name='demo.js').read_js_file()

url = "https://xhpfmapi.zhongguowangshi.com/v600/core/columnnewslist"


def get_js_results(params, response_data):
    if params:
        results = ctx.call('get_encrypt_params', params)
    else:
        results = ctx.call('decrypt', response_data)
    return results


def get_results(page):
    params = {"cid": "25295", "pn": page, "clientVer": "8.8.2", "clientLable": "h5", "source": 0, "userID": ""}
    param = get_js_results(params, response_data=None)
    logger.info(f'第 {page} 页参数: {param}')
    data = {
        "param": param
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)
    encrypt_data = response.json()
    decrypt_data = get_js_results(params=None, response_data=encrypt_data)
    return json.loads(decrypt_data)


def trans_ts(ts):
    timestamp = ts / 1000  # 将毫秒转换为秒
    dt = datetime.datetime.fromtimestamp(timestamp)
    return dt


def main():
    for page in range(1, 10):
        results = get_results(page)
        news_list = results['newsList']
        for news in news_list:
            title = news['topic']
            comment_count = news['commentCount']
            detail_url = news['detailurl']
            ts = news['relaseDateTimeStamp']
            update_date = trans_ts(ts)
            print(f'标题: {title}\n评论数量: {comment_count}\n发布时间: {update_date}\n详情链接: {detail_url}')
            print('===' * 30)


if __name__ == '__main__':
    main()
