# _*_ coding: utf-8 _*_
# @Date:  5:32 下午
# @File: demo.py
# @Author: liyf

'''
第一次请求
- 主页 https://cas.gench.edu.cn/cas/login
    - get请求，从源码中获取 execution 字段

第二次请求
- 登录接口 https://cas.gench.edu.cn/cas/login
    - post请求
    - params包括 execution、加密后的密码、账户
    - 如果不带 execution 的画，请求出来的源码为主页源码，不是接口返回的源码

全局搜索关键字 'password' 可在 'login.js' 文件中，找到如下代码：
- result = RSAUtils.encryptedString(key, thisPwd)
result 就是最终加密后的结果
在该处下断点，进入 RSAUtils.encryptedString 函数中
- 把该文件中的所有js代码复制下来，放在本地运行即可
- 无需进行额外修改
'''

import re
import execjs
import requests

from loguru import logger

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://cas.gench.edu.cn",
    "Pragma": "no-cache",
    "Referer": "https://cas.gench.edu.cn/cas/login",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
}

f = open('demo.js', 'r')
js_str = f.readlines()
ctx = execjs.compile(''.join(js_str))


def get_results(url):
    response = requests.get(url, headers=headers)
    return response.text


def get_api_status(username, pwd, execution):
    url = "https://cas.gench.edu.cn/cas/login"
    data = {
        "username": username,
        "password": pwd,
        "execution": execution,
        "encrypted": "true",
        "_eventId": "submit",
        "loginType": "1"
    }
    response = requests.post(url, headers=headers, data=data)
    return response.text


def get_execution():
    url = 'https://cas.gench.edu.cn/cas/login'
    html = get_results(url)
    execution = re.findall(re.compile(r'name="execution".*?value="(.*?)".*?/>', re.S), html)[0]
    return execution


def main():
    execution = get_execution()
    logger.info(f'execution: {execution}')
    user_name = 'test_test'
    pwd = '123456'
    encrypt_pwd = ctx.call('get_encrypt_pwd', pwd)
    logger.info(f'密码加密结果: {encrypt_pwd}')
    results = get_api_status(user_name, encrypt_pwd, execution)
    if '账户或密码不正确' in results:
        logger.info(f'登录完成，状态为【账户或密码不正确】')


if __name__ == '__main__':
    main()
