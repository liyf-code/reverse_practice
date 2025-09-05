# _*_ coding: utf-8 _*_
# @Date:  11:33 上午
# @File: demo.py
# @Author: liyf

import execjs
import requests

from loguru import logger

f = open('demo.js', 'r')
js_str = f.read()
ctx = execjs.compile(''.join(js_str))

headers = {
    "authority": "api.yuanchuan.cn",
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}
url = "https://api.yuanchuan.cn/yc/webbloglist?apptype=9"


def get_results(page):
    enc_para = ctx.call('get_enc_para', page)
    logger.info(f'第{page}页请求参数: {enc_para}')
    response = requests.post(url, headers=headers, data=enc_para)
    return response.json()


def get_decrypt_data():
    for page in range(1, 11):
        results = get_results(page)
        decrypt_data = ctx.call('oh.Decrypt', results['data'])
        data_list = decrypt_data['list']
        for data in data_list:
            title = data['title']
            user_name = data['userName']
            content = data['content']
            post_date = data['ctime']
            theme = data['themeTitle']
            tags = '、'.join([tag['tagName'] for tag in data['tags']])
            print(
                f'标题: {title}\n内容: {content}\n作者: {user_name}\t更新日期: {post_date}\n标签: {tags}\t主题标题: {theme}')
            print('===' * 20)
        print('***' * 30)
        break


def main():
    get_decrypt_data()


if __name__ == '__main__':
    main()
