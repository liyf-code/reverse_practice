# _*_ coding: utf-8 _*_
# @Date:  6:27 下午
# @File: demo.py
# @Author: liyf

"""
爬虫文档（http://liuyan.people.com.cn/messageSearch）
需要逆向的参数: 请求参数中的signature
步骤：
- 全局搜索 `signature`，可在`app.xxx.js`文件中找到如下代码:
    ```
    h = function(e, t, c, s) {
        var a = e.indexOf("?");
        a > 0 && (e = e.substring(0, a));
        var i = e + JSON.stringify(t) + c;
        return s && (i += s),
        l()(i)
    }
      , d = function(e, t, c, s) {
        var a;
        a = c ? l()(c).substring(0, 16) : l()(s).substring(0, 16);
        var i = {
            appCode: s,
            token: c,
            signature: h(e, t, a, c),
            param: JSON.stringify(t)
        };
    ```
- 通过分析该代码，可发现signature由h函数生成，且穿进去四个参数`e, t, a, c`
- 而h函数最终返回 `l()(i)`
    - 其中i的值为: '/v2/threads/search{"position":0,"keywords":"","fid":null,"domainId":null,"typeId":null,"timeRange":null,"ansChecked":false,"stTime":null,"sortType":"0","page":10,"rows":10}a2eb17f65d6f4b3f'
    - 经过测试，最终signature的值就是对i进行md5加密得到的结果
- 分析参数`i`的构成
    - 大致可分为三部分
    - para1: /v2/threads/search, 此为post请求所需要的url的后缀
    - para2: {"position":0,"keywords":"","fid":null,"domainId":null,"typeId":null,"timeRange":null,"ansChecked":false,"stTime":null,"sortType":"0","page":10,"rows":10}, 此为post请求，所携带的参数，其中page可变
    - para3: a2eb17f65d6f4b3f, 此为对 `appcode` 的值进行md5加密，并取前16位得到的值
    - 最终把这三部分进行拼接，得到最终的值，并进行md5加密，即可得到signature
"""

import hashlib
import requests
import time


def encrypt(str) -> str:
    """
    实现md5加密
    :param str: 待加密字符串
    :return: 加密后的结果
    """
    md5 = hashlib.md5()
    # md5.update(str) 报错信息：TypeError: Unicode-objects must be encoded before hashing
    # 解决：必须指定encode
    md5.update(str.encode('utf8'))
    return md5.hexdigest()


def get_results(page):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'http://liuyan.people.com.cn',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'token': '',
    }
    app_code = 'PC42ce3bfa4980a9'
    # app_code的值可由http://liuyan.people.com.cn/messageSearch，在其源代码中通过正则规则 `window.SITE_CONFIG['appCode'] =(.*?)'`得到
    params = {
        'sortType': '0',
    }
    json_data = {
        'appCode': 'PC42ce3bfa4980a9',
        'token': '',
        'param': '{"position":0,"keywords":"","fid":null,"domainId":null,"typeId":null,"timeRange":null,"ansChecked":false,"stTime":null,"sortType":"0","page":%s,"rows":10}' % page,
    }
    para1 = '/v2/threads/search'
    para2 = json_data['param']
    para3 = encrypt(app_code)[0:16]
    encrypt_str = para1 + para2 + para3
    signature = encrypt(encrypt_str)
    json_data['signature'] = signature
    response = requests.post('http://liuyan.people.com.cn/v2/threads/search', params=params, headers=headers,
                             json=json_data, verify=False)
    return response.json()


def parse():
    for page in range(1, 100):
        results = get_results(page)
        data_list = results['data']['data']
        for data in data_list:
            title = data['subject']
            typeName = data['typeName']
            domainName = data['domainName']
            content = data['content']
            status = data['stateInfo']
            forumName = data['forumName']
            nickName = data['nickName']
            date = data['createDateline']
            # 时间戳转换为时间格式
            dateline = time.strftime("%Y-%m-%d %H:%M", time.localtime(date))
            print(
                f'标题: {title}\n类型: {typeName}\n区域: {domainName}\n状态: {status}\n留言对象: {forumName}\n留言用户: {nickName}\n留言日期: {dateline}\n留言内容: {content}')
            print('===' * 30)


if __name__ == '__main__':
    parse()
