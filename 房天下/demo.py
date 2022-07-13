# _*_ coding: utf-8 _*_
# @Date:  6:03 下午
# @File: demo.py
# @Author: liyf

import execjs
import requests

from loguru import logger


def get_js_pwd(password):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    return ctx.call('get_password', password)


def get_json_data(user, pwd):
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'https://passport.fang.com/',  # 这个请求头不能少，否则报错
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    }
    data = {
        'uid': user,
        'pwd': get_js_pwd(pwd),
        'Service': 'soufun-passport-web',
        'AutoLogin': '1',
    }

    response = requests.post('https://passport.fang.com/', headers=headers, data=data)
    return response.json()


def main():
    user = 'username'
    pwd = 'password'
    results = get_json_data(user, pwd)
    print(results)
    msg = results['Message']
    tip = results['Tip']
    if msg == 'Success':
        logger.info(
            f'\n账号信息\nUserID: {results["UserID"]}\nUserName: {results["UserName"]}n\nCurrentIP: {results["Ip"]}')
    else:
        logger.info(f'Account Login Status: {msg}\t{tip}')


if __name__ == '__main__':
    main()
