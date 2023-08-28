# _*_ coding: utf-8 _*_
# @Date:  1:47 下午
# @File: demo.py
# @Author: liyf
import requests
import json

import execjs

from loguru import logger

headers = {
    "authority": "lark-acl.alibaba.com",
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://www.iyunzhi.com",
    "pragma": "no-cache",
    "referer": "https://www.iyunzhi.com/",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
}

f = open('demo.js')
js_str = f.read()
ctx = execjs.compile(''.join(js_str))


def get_login_res(password):
    url = "https://lark-acl.alibaba.com/idp/loginAccountAndPwd"
    params = {
        "access_token": ""
    }
    enc_pwd = ctx.call('get_encrypted_pwd', password)
    logger.info(f'\n加密前密码: {password}\n加密后密码: {enc_pwd}')
    data = {
        "loginId": "19929939949",
        "password": enc_pwd
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, params=params, data=data)
    return response.json()


def main():
    pwd = '123456'
    login_res = get_login_res(pwd)
    logger.info(login_res)


if __name__ == '__main__':
    main()

