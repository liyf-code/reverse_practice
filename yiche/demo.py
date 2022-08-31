# _*_ coding: utf-8 _*_
# @Date:  1:55 下午
# @File: demo.py
# @Author: liyf

"""
获取易车网汽车配置信息
根据cid获取value，用来拼接字符串，最终进行加密计算得到x-sign
todo:{name: 'pc', value: '19DDD1FBDFF065D3A4DA777D2D7A81EC', cid: '508'},
     {name: 'phone', value: 'DB2560A6EBC65F37A0484295CD4EDD25', cid: '601'},
     {name: 'h5', value: '745DFB2027E8418384A1F2EF1B54C9F5', cid: '601'},
     {name: 'business_applet', value: '64A1071F6C3C3CC68DABBF5A90669C0A', cid: '601'},
     {name: 'wechat', value: 'AF23B0A6EBC65F37A0484395CE4EDD2K', cid: '601'},
     {name: 'tencent', value: '1615A9BDB0374D16AE9EBB3BBEE5353C', cid: '750'}

通过搜索关键字 x-sign 定位到代码
关键代码: r = "cid=" + t.cid + "&param=" + n + o + t.timestamp,
         u = (0, x.md5)(r);
计算出来的u就是x-sign的值，经测试，r经过md5加密就是u的值
"""

import json
import time
import hashlib
import requests


def get_s_sign(params) -> str:
    md5 = hashlib.md5()
    md5.update(params.encode('utf8'))
    return md5.hexdigest()


def get_results(cid, para):
    t_str = str(int(time.time() * 1000))
    # 根据cid的不同，val的值不同
    val = '19DDD1FBDFF065D3A4DA777D2D7A81EC'
    params = 'cid=%s&param=%s%s%s' % (cid, para, val, t_str)
    x_sign = get_s_sign(params)
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Referer': 'https://car.yiche.com/yunqueq1/peizhi/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        'content-type': 'application/json;charset=UTF-8',
        # 以下四个请求头缺一不可
        'x-city-id': '2401',  # 城市标识
        'x-platform': 'pc',
        'x-sign': x_sign,  # 经过加密得到的值
        'x-timestamp': t_str,  # 13位的时间戳
    }
    params = {
        'cid': cid,
        'param': para,
    }
    response = requests.get('https://car.yiche.com/web_api/car_model_api/api/v1/car/config_new_param', params=params,
                            headers=headers)
    return response.json()


def parse():
    para = {"cityId": "2401", "serialId": "5485"}
    cid = 508
    results = get_results(cid, json.dumps(para))
    print(results)


if __name__ == '__main__':
    parse()
