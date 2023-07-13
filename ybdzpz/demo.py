# _*_ coding: utf-8 _*_
# @Date:  6:21 下午
# @File: demo.py
# @Author: liyf

'''
- 全局搜索关键字 `decrypt(` 可定位到如下关键代码：
        var r = i.decrypt(n, e)
          , s = r[r.length - 1];
        return r = r.slice(0, r.length - s),
        t.from(r).toString("utf-8")
    - 在该处打断点，点击下一页之后，断点会生效。

- 往前跟栈，可定位到如下代码：
        var e = Object(p["a"])(t.data);
    - 在该处再打一个断点，点击下一页，断点生效。
    - 在控制台输出 t.data，为加密数据
    - 在控制台输出 Object(p["a"])(t.data)， 为解密后的数据

- webpack加密，入口为 p = e("7d92")。
- 其中e为分发器， 7d92 为模块名称
- 在该处打断点，重新刷新页面，不要点击下一页，否则断点不会生效。
- 接下来就是扣js代码了，没啥难度

'''

import requests
import json

from utils import *

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://ybdzpz.ylbz.gansu.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://ybdzpz.ylbz.gansu.gov.cn/hsa-local-prod/web/hallEnter/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
}

ctx = Utils(js_file_name='demo.js').read_js_file()


def get_decrypt_data(data):
    decrypt_data = ctx.call('decrypt', data)
    return decrypt_data


def get_results(page):
    url = "https://ybdzpz.ylbz.gansu.gov.cn/hsa-pss-pw/web/pw/base/queryRtalPhacBInfo"
    data = {
        "rtalPhacName": "",
        "rtalPhacCode": "",
        "uscc": "",
        "admdvs": "",
        "pageNo": page,
        "pageSize": 10
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)
    return response.json()


def main():
    for page in range(1, 10):
        results = get_results(page)
        decrypt_data = get_decrypt_data(results['data'])
        data_list = decrypt_data['data']
        for data in data_list:
            shop_name = data['rtalPhacName']
            addr = data['addr']
            social_code = data['uscc']
            scope = data['drugBizScp']
            licence_code = data['phacPmtno']
            shop_code = data['rtalPhacCode']
            print(
                f'药店名称: {shop_name}\n药店地址: {addr}\n统一社会信用代码: {social_code}\n药店经营范围: {scope}\n药店经营企业许可证号: {licence_code}\n药店代码: {shop_code}')
            print('===' * 30)


if __name__ == '__main__':
    main()
