# _*_ coding: utf-8 _*_
# @Date:  3:08 下午
# @File: demo.py
# @Author: liyf

'''
主页: http://www.hh1024.com/#/login?redirect=%2FrealTimeLiving
登录接口: https://user.hrdjyun.com/wechat/phonePwdLogin
    - post请求
    - 请求参数中pwd和sig参数需要破解

todo 破解流程
- pwd
    - 根据经验，可以确定为md5加密

- sig
    - 全局搜索 `sig:` 可以定位到关键代码如下：
        var l = Object(g["a"])(P(S(e)));
        sig: l
    - 接下来就是扣代码环节，缺啥补啥，没啥难度

- 封装js代码，代入到python文件中
    - 当账号和密码分别为 `12345678919` 和 `123456` 时
    - 测试结果：{'status': 3, 'message': '手机号还未注册', 'data': None}
    - 跟网页上的返回结果一致，验证成功！

- 基础入门，适合新手练习
'''

import time
import requests

from utils import *


def get_sig(params):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('get_sig', params)


def get_results(username, pwd):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    }
    pwd = Utils(origin_md5_str=pwd).encrypt_md5()
    logger.info(f'加密后的密码: {pwd}')
    json_data = {
        'phoneNum': str(username),
        'pwd': pwd,
        't': int(time.time() * 1000),
        'tenant': 1,
    }
    sig = get_sig(json_data)
    logger.info(f'sig参数获取: {sig}')
    json_data['sig'] = sig
    response = requests.post('https://user.hrdjyun.com/wechat/phonePwdLogin', headers=headers, json=json_data)
    return response.json()


if __name__ == '__main__':
    results = get_results('12345678919', '123456')
    logger.info(f'接口响应结果:\n{results}')
    logger.info(f'账号信息: {results["message"]}')
