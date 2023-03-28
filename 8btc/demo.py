# _*_ coding: utf-8 _*_
# @Date:  11:45 上午
# @File: demo.py
# @Author: liyf

import time
import requests

from utils import *


def conversion_time_str(postDate):
    """
    时间戳转标准时间格式
    :param postDate: 时间戳
    :return: 标准时间格式
    """
    timeArray = time.localtime(postDate)
    res_time = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    return res_time


def get_device_id_and_sign(sign_params):
    ctx = Utils(js_file_name='demo.js').read_js_file()
    device_id = ctx.call('get_device_id', 20, 20)
    sign = ctx.call('get_sign', sign_params)
    return device_id, sign


def get_results(json_data):
    sign_params = {"appId": "1", "timestamp": str(int(time.time())), "serverCode": "0"}
    device_id, sign = get_device_id_and_sign(sign_params)
    logger.info({'device_id': device_id, 'sign': sign})
    headers = {
        'authority': 'gate.8btc.cn:8443',
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'app-code': '8btc',
        'authorization': '{"secretKeyVersion":1,"sign":"%s"}' % sign,
        'device_id': device_id,
        'origin': 'https://www.8btc.com',
        'referer': 'https://www.8btc.com/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    }
    response = requests.post('https://gate.8btc.cn:8443/one-graph-auth/graphql', headers=headers, json=json_data)
    return response.json()


def parse(json_data):
    results = get_results(json_data)
    data_list = results['data']['articleGraph']['list']['edges']
    for data in data_list:
        node = data['node']
        title = node['post']['title']
        post_date = node['post']['postDate']
        release_time = conversion_time_str(post_date)
        source = node['extra']['source']['name']
        link = node['extra']['source']['link']
        links = '无' if not link else link
        source = '无' if not source else source
        up = node['sense']['up']
        down = node['sense']['down']
        desc = node['post']['desc']
        print(
            f'标题: {title}\n发布时间: {release_time}\n来源: {source}\n利好: {up}\n利空: {down}\n原文链接: {links}\n内容: {desc.strip()}')
        print('===' * 30)

    page_info = results['data']['articleGraph']['list']['pageInfo']
    has_next_page = page_info['hasNextPage']
    if not has_next_page:
        logger.info('已经是最后一页了~~~')
        return
    next_page_params = page_info['endCursor']
    json_data['variables']['after'] = next_page_params
    parse(json_data)


if __name__ == '__main__':
    json_data = {
        'operationName': 'listFlash',
        'variables': {
            'flashCategory': 'GENERAL',
            'first': 20,
        },
        'query': 'query listFlash($first: Int, $after: String, $showOn7x24h: Boolean, $flashCategory: FlashCategory = GENERAL, $tag: Int, $startTime: Date, $endTime: Date) { articleGraph { list: listFlash(page: {first: $first, after: $after, pattern: CURSOR}, param: {flashCategory: $flashCategory, showOn7x24h: $showOn7x24h, tagId: $tag, startTime: $startTime, endTime: $endTime}) { edges { node { id post { title   desc   content   postDate   thumbnail   __typename } extra { authorInfo { base {   displayName __typename } __typename } source { link     name     __typename } __typename } ... on Flash { highlight   push   sense { down     up     select     __typename   }   __typename } __typename } __typename } pageInfo { hasNextPage totalCount startCursor endCursor __typename } __typename } __typename }}',
    }
    parse(json_data)
