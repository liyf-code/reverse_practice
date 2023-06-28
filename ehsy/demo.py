# _*_ coding: utf-8 _*_
# @Date:  10:50 上午
# @File: demo.py
# @Author: liyf

import execjs
import requests

from loguru import logger

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://m.ehsy.com",
    "Pragma": "no-cache",
    "Referer": "https://m.ehsy.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "content-type": "application/x-www-form-urlencoded",
}

url = "https://m2.ehsy.com/pb/product/search/filter"
f = open('demo.js', 'r')
js_str = f.readlines()
ctx = execjs.compile(''.join(js_str))


def get_results(start):
    data = {
        "search": "{'catId':'16474','filterFieldsValues':{},'filters':{}}",
        "flag": "true",
        "sortType": "0",
        "start": start,
        "rows": "20",
        "cityId": "321",
        "token": "",
        "createFrom": "m"
    }
    ehsy_verify = ctx.call('p')
    logger.info(f'ehsy_verify: {ehsy_verify}')
    headers['ehsy-verify'] = ehsy_verify
    response = requests.post(url, headers=headers, data=data)
    return response.json()


def main():
    for start in range(0, 200, 20):
        results = get_results(start)
        data_list = results['data']['queryPage']['data']
        for data in data_list:
            title = data['productName']
            brand = data['brandName']
            sku_code = data['skuCode']
            sale = data['salePrice']
            print(f'名称: {title}\n品牌型号: {brand}\n订货号: {sku_code}\n含税: {sale}')
            print('=====' * 15)


if __name__ == '__main__':
    main()
