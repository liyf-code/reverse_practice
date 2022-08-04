# _*_ coding: utf-8 _*_
# @Date:  5:38 下午
# @File: demo.py
# @Author: liyf
import execjs
import requests

from lxml import etree


def get_html(url):
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    }

    response = requests.get(url, headers=headers, verify=False)
    return response.text


def get_index_url(url):
    html = get_html(url)
    response = etree.HTML(html)
    li_list = response.xpath('//ul[@class="article-list2"]/li')
    for li in li_list:
        index_url = li.xpath('div/a/@url')[0]
        get_detail_url(index_url)


def get_detail_url(index_url):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    detail_url = ctx.call('get_detail_url', index_url)
    print(detail_url)


if __name__ == '__main__':
    for page in range(1, 10):
        url = f'http://ggzy.zwfwb.tj.gov.cn/jyxx/index_{page}.jhtml'
        get_index_url(url)
        # break
