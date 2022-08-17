# _*_ coding: utf-8 _*_
# @Date:  4:24 下午
# @File: demo.py
# @Author: liyf

'''
粉笔网登录破解 - https://fenbi.com/page/home
简单的RAS加密
'''

import requests
import execjs


def get_js_pwd(password):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    return ctx.call('get_password', password)


def get_json_data(user, pwd):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    }

    params = {
        'kav': '12',
        'app': 'web',
    }

    data = {
        'password': get_js_pwd(pwd),
        'persistent': 'true',
        'app': 'web',
        'phone': user,
    }

    response = requests.post('https://login.fenbi.com/api/users/loginV2?kav=12&app=web&av=80', params=params,
                             headers=headers, data=data)
    return response.json()


def main():
    # user = input('请输入账号:')
    # pwd = input('请输入密码:')
    user = '1234567890'
    pwd = '111111'
    results = get_json_data(user, pwd)
    print(results)


if __name__ == '__main__':
    # https://fenbi.com/page/home
    main()
