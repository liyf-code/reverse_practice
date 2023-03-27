# _*_ coding: utf-8 _*_
# @Date:  10:20 上午
# @File: login.py
# @Author: liyf

import execjs
import requests

from loguru import logger

f = open('login.js', 'r')
js_str = f.read()
ctx = execjs.compile(''.join(js_str))


def get_login_res(username, pwd):
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://account.court.gov.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
    }
    encrypt_pwd = ctx.call('encrypt_pwd', pwd)
    data = {
        'username': username,
        'password': encrypt_pwd,
        'appDomain': 'wenshu.court.gov.cn',
    }
    response = requests.post('https://account.court.gov.cn/api/login', headers=headers, data=data)
    return response.json()


def main():
    user = '1234567890'
    pwd = '123456'
    login_res = get_login_res(user, pwd)
    logger.info(f'登录结果如下:\n{login_res}')  # {'code': '999999', 'data': None, 'message': '账户格式不正确', 'success': False}
    msg = login_res['message']
    logger.info(f'登录状态: {msg}')  # 登录状态: 账户格式不正确


if __name__ == '__main__':
    main()
