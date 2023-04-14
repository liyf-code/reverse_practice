# _*_ coding: utf-8 _*_
# @Date:  11:05 上午
# @File: demo.py
# @Author: liyf

'''
主页接口：https://www.python-spider.com/challenge/25

刷新该页面出现以下两个接口：
- challenge25 接口
    - 获取数据接口，从第一页开始
- challenge25verify 接口
    - 这个是获取图片的接口，接口返回的图片格式是base64

滑动图片，出现第三个接口
- challenge25CheckVerify 接口
    - 参数是识别出来的缺口距离
    - 返回值中有个 rate 值，当这个值大于95%时候，请求下一页才能成功，否则请求失败


该代码识别准确率不高，只能识别出来前几页。使用的ddddocr，如果有更好的识别方法，欢迎交流
'''

import os
import base64
import ddddocr
import requests

from loguru import logger

path = 'images'

if not os.path.exists(path):
    os.makedirs(path)

bg_name, slide_name = 'bg', 'slide'

headers = {
    'authority': 'www.python-spider.com',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.python-spider.com',
    # cookie参数必须携带，为renponse header中set-cookie的值
    'cookie': 'sessionid=svm5k9nf9z6ublc7qjbndn3n84q85f0k; expires=Fri, 14 Apr 2023 09:43:14 GMT; HttpOnly; Max-Age=21600; Path=/; SameSite=Lax',
    'pragma': 'no-cache',
    'referer': 'https://www.python-spider.com/challenge/25',
    'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}


def get_results(page, distant):
    if page:
        data = {'page': str(page)}
        url = 'https://www.python-spider.com/api/challenge25'
        response = requests.post(url, headers=headers, data=data)
    else:
        data = {'distant': str(distant)}
        url = 'https://www.python-spider.com/api/challenge25CheckVerify'
        response = requests.post(url, headers=headers, data=data)
    return response.json()


def trans_image(name, b64_str):
    '''
    base64字符串还原成图片，并保存
    :return:
    '''
    imgdata = base64.b64decode(b64_str)
    f = open(f'{path}/{name}.png', 'wb')
    f.write(imgdata)
    f.close()


def get_distance(path):
    '''
    识别缺口距离
    :param path: 图片存放的位置
    :return:
    '''
    det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    puzzle_path = f'{path}/{slide_name}.png'
    bg_path = f'{path}/{bg_name}.png'
    puzzle_bytes = open(puzzle_path, 'rb').read()
    bg_bytes = open(bg_path, 'rb').read()
    res = det.slide_match(puzzle_bytes, bg_bytes, simple_target=True)
    distance = res['target'][0]
    return distance


def get_image():
    url = 'https://www.python-spider.com/api/challenge25verify'
    response = requests.get(url, headers=headers)
    results = response.json()
    for name, b64_str in results.items():
        trans_image(bg_name if name == 'img1' else slide_name, b64_str)


def get_rate():
    get_image()
    distance = get_distance(path)
    rate_res = get_results(page=None, distant=distance)
    rate = rate_res["rate"]
    return distance, rate


def main():
    count = 0
    for page in range(1, 101):
        results = get_results(page, distant=None)
        data_list = results['data']
        count += sum([int(data['value']) for data in data_list])
        logger.info(f'前 {page} 页的和为: {count}')
        distance, rate = get_rate()
        num = int(str(rate).split('.')[0])
        logger.info(f'缺口位置: {distance}, 成功率: {rate}')
        while num < 95:
            distance, rate = get_rate()
            num = int(str(rate).split('.')[0])
            logger.info(f'第 {page + 1} 页, distance: {distance}, rate: {rate}')
        else:
            continue


if __name__ == '__main__':
    main()
