# _*_ coding: utf-8 _*_
# @Date:  4:45 下午
# @File: demo.py
# @Author: liyf

'''
主页: https://passport.didichuxing.com/#/
接口: https://epassport.diditaxi.com.cn/passport/login/v5/signInByPassword?wsgsig=xxx
    - get请求
    - 需要破解 `wsgsig` 参数
todo 破解流程
- 直接通过全局搜索关键字 `wsgsig` 可以直接定位到加密位置，如下
    - `wsgsig: E.a.getSign.apply(E.a, e)`
    - 在此处下断点，并点击登录。断点生效，说明此处为加密位置

- 通过格式可以判断出，该参数的加密大概率是webpack，所以在该处往上查找 `E` 的定义，找到如下代码
    - `O = n("Yt3Z")
      , E = n.n(O);`
    - 从而确定该加密为webpack

- 所以老老实实的找分发器，并扣所需要的模块
    - 在 `O = n("Yt3Z")` 处下断点，重新刷新页面，断点即可生效，在控制台输入 `n`，即为分发器，复制下来即可
    - 所需要的模块只有两个，分别为 `Yt3Z` 和 `3IRH`

- 封装js代码，使入口函数返回值为 `wsgsig` 即可，带入到python代码中测试
    - 测试结果，当传入的账号和密码分别为 `16677882222` 和 `123456` 时，接口返回的结果如下：
        - `
        {'errno': 51003, 'error': '用户信息不存在', 'requestid': '1673860276422932612', 'traceid': '0a22221b63c514b4950e7b955d141b02', 'time': '2023-01-16 17:11:16'}
        `
    - 跟网页上的返回结果一致，验证成功！

- 难度，入门
'''
import requests

from utils import *


def get_wsgsig(data):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    return ctx.call('get_wsgsig', data)


def get_results(username, pwd):
    """
    获取接口返回信息
    :param username: 明文账号
    :param pwd: 明文密码
    :return: 响应结果
    """
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    }
    data = {
        'q': '{"domain":"https://epassport.diditaxi.com.cn","role":13,"appid":50001,"source":70001,"api_version":"1.0.1","lang":"zh-CN","imei":"cef8ea1124037639533c070c708e672d","cell":"%s","country_calling_code":"+86","country_id":156,"password":"%s"}' % (
            username, pwd),
    }
    wsgsig = get_wsgsig(data)
    logger.info(f'wsgsig: {wsgsig}')
    params = {
        'wsgsig': wsgsig,
    }
    response = requests.post(
        'https://epassport.diditaxi.com.cn/passport/login/v5/signInByPassword',
        params=params,
        headers=headers,
        data=data,
    )
    return response.json()


if __name__ == '__main__':
    results = get_results('16677882222', '123456')
    logger.info(f'接口响应结果:\n{results}')
    logger.info(f'账号信息: {results["error"]}')
