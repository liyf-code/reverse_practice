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
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'Host': 'ggzy.zwfwb.tj.gov.cn',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Cookie': 'clientlanguage=zh_CN; JSESSIONID=B2C036872F09FB3066BC1E1D71CF6D69'
    }

    response = requests.get(url, headers=headers, verify=False)
    return response


def get_index_url(url):
    response = get_html(url)
    if response.status_code != 200:
        print(f'状态码: {response.status_code}, 重新请求: {url}')
        get_index_url(url)
    html = response.text
    response = etree.HTML(html)
    li_list = response.xpath('//ul[@class="article-list2"]/li')
    for li in li_list:
        index_url = li.xpath('div/a/@url')[0]
        span_list = li.xpath('div/a//text()')
        title = ''.join(span_list).strip()
        get_detail_url(index_url, title)


def get_detail_url(index_url, title):
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    detail_url = ctx.call('get_detail_url', index_url)
    item = {
        'url': detail_url,
        'title': title
    }
    print(item)


if __name__ == '__main__':
    for page in range(1, 10):
        url = f'http://ggzy.zwfwb.tj.gov.cn/jyxx/index_{page}.jhtml'
        get_index_url(url)
        # break
