# _*_ coding: utf-8 _*_
# @Date:  4:30 下午
# @File: demo.py
# @Author: liyf

import requests

from utils import *


def get_nonce():
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }
    response = requests.get('https://passport.ximalaya.com/web/nonce/1673423703373', headers=headers)
    results = response.json()
    return results['nonce']


def get_pwd(pwd):
    ctx = Utils(js_file_name='get_pwd.js').read_js_file()
    return ctx.call('get_pwd', pwd)


def get_signature(req_data):
    ctx = Utils(js_file_name='get_signature.js').read_js_file()
    return ctx.call('F', req_data)


def get_results(password):
    nonce = get_nonce()
    logger.info(f'nonce: {nonce}')
    pwd = get_pwd(password)  # password：明文密码
    logger.info(f'\n明文密码: {password}\n密文密码: {pwd}')
    json_data = {
        "account": "111111",  # 账号
        "password": pwd,
        "nonce": nonce
    }
    signature = get_signature(json_data)
    logger.info(f'signature: {signature}')
    json_data['signature'] = signature
    json_data['rememberMe'] = True
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }
    response = requests.post('https://passport.ximalaya.com/web/login/pwd/v1', headers=headers,
                             json=json_data)
    return response.json()


results = get_results('123456')
msg = results['msg']
logger.info(f'登录结果: {msg}')  # 登录结果: 账号或密码错误
