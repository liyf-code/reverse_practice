# _*_ coding: utf-8 _*_
# @Date:  11:36 上午
# @File: demo.py
# @Author: liyf

import json
import execjs
import requests

from loguru import logger

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://www.iwencai.com",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
}

user_id = 'Ths_iwencai_Xuangu_ofiuz9isc7eb6d7pwrqbrn9qslgcur21'
source = 'Ths_iwencai_Xuangu'

cookies = {
    "other_uid": user_id,
    # "ta_random_userid": "aoarc59l8n",
    # "cid": "36b5973ac03c1946fe1bc9a16e43b32f1754011606",
    # "v": "A1ojKPZD5tmeO2p1o59J0fPvrQt5i95lUA9SCWTTBu241_S1TBsudSCfohM3"
}


def read_js_file():
    f = open('demo.js', 'r', encoding='utf8')
    js_str = f.read()
    ctx = execjs.compile(''.join(js_str))
    return ctx


def get_robot_data():
    ctx = read_js_file()
    hexin_v = ctx.call('get_cookie')
    headers['hexin-v'] = hexin_v
    # headers['cookie'] = f'v={hexin_v};'
    cookies['v'] = hexin_v
    url = "https://www.iwencai.com/customized/chart/get-robot-data"
    data = {
        "source": source,
        "version": "2.0",
        "query_area": "",
        "block_list": "",
        "add_info": "{\"urp\":{\"scene\":1,\"company\":1,\"business\":1},\"contentType\":\"json\",\"searchInfo\":true}",
        "question": "人气个股排名",
        "rsh": user_id,
        "perpage": 50,
        "page": 1,
        "secondary_intent": "",
        "log_info": "{\"input_type\":\"click\"}"
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data, cookies=cookies)
    return response.json()


def get_results(page: str, logid: str, token: str):
    ctx = read_js_file()
    hexin_v = ctx.call('get_cookie')
    headers['hexin-v'] = hexin_v
    # headers['cookie'] = f'v={hexin_v}; '
    # cookies = {
    #     "other_uid": user_id,
    #     "ta_random_userid": "aoarc59l8n",
    #     "cid": "36b5973ac03c1946fe1bc9a16e43b32f1754011606",
    #     "v": hexin_v
    # }
    cookies['v'] = hexin_v
    logger.info(f'hexin-v: {hexin_v}')
    url = "https://www.iwencai.com/gateway/urp/v7/landing/getDataList"
    data = {
        "query": "人气个股排名",
        "urp_sort_way": "desc",
        "urp_sort_index": "个股热度[20250801]",
        "page": "1",
        "perpage": "50",
        "addheaderindexes": "",
        "condition": "[{\"ci\":true,\"opPropertiesMap\":{},\"opProperty\":\"从大到小排名\",\"source\":\"text2sql\",\"score\":0,\"ciChunk\":\"人气个股排名\",\"createBy\":\"preCache\",\"node_type\":\"op\",\"chunkedResult\":\"人气个股排名\",\"children\":[],\"opName\":\"sort\",\"uiText\":\"个股热度从大到小排名\",\"sonSize\":1},{\"dateText\":\"\",\"ci\":false,\"indexName\":\"个股热度\",\"indexProperties\":[\"nodate 1\",\"交易日期 20250801\"],\"dateUnit\":\"日\",\"source\":\"text2sql\",\"type\":\"index\",\"indexPropertiesMap\":{\"交易日期\":\"20250801\",\"nodate\":\"1\"},\"reportType\":\"NATURAL_DAILY\",\"score\":0,\"createBy\":\"preCache\",\"node_type\":\"index\",\"dateType\":\"+区间\",\"domain\":\"abs_股票领域\",\"valueType\":\"_浮点型数值\",\"sonSize\":0}]",
        "codelist": "",
        "indexnamelimit": "",
        "logid": logid,
        "ret": "json_all",
        "sessionid": logid,
        "source": source,
        "date_range%5B0%5D": "20250801",
        "iwc_token": token,
        "urp_use_sort": "1",
        "user_id": user_id,
        "uuids%5B0%5D": "24087",
        "query_type": "stock",
        "comp_id": "6836372",
        "business_cat": "soniu",
        "uuid": "24087"
    }
    response = requests.post(url, headers=headers, data=data, cookies=cookies, verify=False)
    return response.json()


def parse():
    res = get_robot_data()
    logid = res["logid"]
    token = res["data"]['answer'][0]['txt'][0]['content']['components'][0]['data']['meta']['extra']['token']
    logger.info(f'logid: {logid}, token: {token}')
    for page in range(1, 10):
        results = get_results(str(page), logid, token)
        print(results)
        logger.info(f'第 {page} 页抓取结束～')
        break


if __name__ == '__main__':
    parse()
