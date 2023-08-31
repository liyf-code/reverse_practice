# _*_ coding: utf-8 _*_
# @Date:  4:22 下午
# @File: demo.py
# @Author: liyf

'''
逆向参数
- 请求头中 X-Ca-Signature 和 X-Ca-Nonce 为必要参数，且缺一不可

思路
全局搜索关键字 X-Ca-Signature 即可定位到关键函数，如下
    e.headers["X-Ca-Nonce"] = f(),
    "[object FormData]" === Object.prototype.toString.call(e.data) && (e.headers["X-Ca-Signed-Content-Type"] = "multipart/form-data",
    e.headers["X-Ca-Signature"] = h({
        method: a,
        url: c,
        accept: t,
        params: d,
        date: n,
        contentType: i,
        headers: e.headers,
        appSecret: r
    })

在该处下断点，点击下一页，断点即可生效
其中，生成 X-Ca-Nonce 参数的为 f 函数，且点进去 f 函数，发现 f 函数为一个获取随机uuid的函数。

生成 X-Ca-Signature 参数的为 h 函数，接收的参数为一个对象，在该对象中，只有两个参数是变化的，剩下的参数均可为固定
    - page参数可变，表示页码
    - nonce参数可变，随机生成的uuid

'''

import execjs
import requests

from loguru import logger

f = open('demo.js', 'r')
js_str = f.read()
ctx = execjs.compile(''.join(js_str))

headers = {
    "authority": "bizapi.csdn.net",
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "origin": "https://bbs.csdn.net",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "x-ca-key": "203899271",
    "x-ca-signature-headers": "x-ca-key,x-ca-nonce"
}
url = "https://bizapi.csdn.net/community-cloud/v1/colleges/main_page/list"

global next_page  # 计算下一页的页码


def get_results(page):
    params = {
        "deviceType": "pc",
        "page": str(page),
        "pageSize": "20",
        "category": "37",
        "sort": "desc",
        "type": "2"
    }
    para_info = ctx.call('get_nonce_signature', page)
    logger.info(f'获取到第 {page} 页请求头加密参数: \n{para_info}')
    headers['x-ca-nonce'] = para_info['nonce']
    headers['x-ca-signature'] = para_info['signature']
    response = requests.get(url, headers=headers, params=params)
    return response.json()


def get_data(page):
    results = get_results(page)
    next_page = page
    data_list = results['data']['list']
    for data in data_list:
        communityName = data['communityName']
        activeUserNum = data['activeUserNum']
        continueLearningDays = data['continueLearningDays']
        influence = data['influence']
        communityNum = data['communityNum']
        user_list = [user['nickName'] for user in data['userList']]
        users = '、'.join(user_list)
        print(
            f'学校名称: {communityName}\n7日活跃人数: {activeUserNum}\n持续学习天数: {continueLearningDays}\n影响力: {influence}\n成员数量: {communityNum}\n明星成员: {users}')
        print('===' * 20)
    print('***' * 25)
    # 自动获取下一页
    total_page = results['data']['totalPages']
    if next_page < total_page:
        next_page += 1
        get_data(next_page)


def main():
    get_data(1)


if __name__ == '__main__':
    main()
