# _*_ coding: utf-8 _*_
# @Date:  11:36 上午
# @File: demo.py
# @Author: liyf

import requests

from lxml import etree

from utils import *


headers = {
    "Accept": "text/html, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Proxy-Connection": "keep-alive",
    "Referer": "http://q.10jqka.com.cn/",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
}


def get_results(page):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    hexin_v = ctx.call('get_cookie')
    headers['hexin-v'] = hexin_v
    headers['cookie'] = f'v={hexin_v};'
    logger.info(f'hexin-v: {hexin_v}')
    url = f"http://q.10jqka.com.cn/index/index/board/all/field/zdf/order/desc/page/{page}/ajax/1/"
    response = requests.get(url, headers=headers, verify=False)
    return response.text


def parse():
    for page in range(1, 10):
        html = get_results(page)
        response = etree.HTML(html)
        tr_list = response.xpath('//tr')
        for tr in tr_list[1:]:
            item = {}
            item['code'] = tr.xpath('td[2]/a/text()')[0]  # 股票代码
            item['name'] = tr.xpath('td[3]/a/text()')[0]  # 股票名称
            item['cur_price'] = tr.xpath('td[4]/text()')[0]  # 现价
            item['up_down_rate'] = tr.xpath('td[5]/text()')[0]  # 涨跌幅
            item['up_down'] = tr.xpath('td[6]/text()')[0]  # 涨跌
            item['up_speed'] = tr.xpath('td[7]/text()')[0]  # 涨速
            item['change_hand'] = tr.xpath('td[8]/text()')[0]  # 换手
            item['volume_rate'] = tr.xpath('td[9]/text()')[0]  # 量比
            item['amplitude'] = tr.xpath('td[10]/text()')[0]  # 振幅
            item['volume_business'] = tr.xpath('td[11]/text()')[0]  # 成交额
            item['tradable_share'] = tr.xpath('td[12]/text()')[0]  # 流通股
            item['tradable_market_value'] = tr.xpath('td[13]/text()')[0]  # 流通市值
            item['earn_ratio'] = tr.xpath('td[14]/text()')[0]  # 市盈率
            print(item)
        logger.info(f'第 {page} 页抓取结束～')


if __name__ == '__main__':
    parse()
