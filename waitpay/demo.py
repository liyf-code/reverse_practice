# _*_ coding: utf-8 _*_
# @Date:  5:02 下午
# @File: demo.py
# @Author: liyf

'''
主页: https://static.waitwaitpay.com/web/sd_se/index.html#/

参考文章: https://mp.weixin.qq.com/s/EQnBJwD8Uo6dHZ6RRPGhFQ

webpack加密
采用自吐的办法，快速补全解密所需的模块

todo 步骤:
- 找到分发器，添加以下代码(首先需要在头部定义`var map_ = {}, code_ = '';`)
  ```
  function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        ==================================================
        // 自吐，只需要添加这几行代码即可，code_这个变量里面存的是导出的代码
        if (typeof (map_[r]) == "undefined") {
            map_[r] = 1;
            code_ = code_ + '"' + r + '":' + e[r] + ',';
        }
        ==================================================
        return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
    }
  ```
- 找到所有的模块，全部copy至本地，使用自吐的办法，在本地输出_code即可
- 优点
    - 速度快，省去了扣代码的步骤
'''

import execjs
import requests


def get_decrypt_data(encrypt_data):
    # 传入加密数据，返回明文数据
    with open('demo.js', 'r') as f:
        js_str = f.readlines()
    ctx = execjs.compile(''.join(js_str))
    return ctx.call('decrypt', encrypt_data)


def get_encrypt_data(page):
    # 传入参数page，获取响应加密数据
    headers = {
        'authority': 'api.waitwaitpay.com',
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://static.waitwaitpay.com',
        'pragma': 'no-cache',
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    }

    params = {
        'latitude': '39.9349',
        'longitude': '116.454',
        'page': str(page),
        # 'request_id': '5e50f62c-6662-4213-acd3-ec50ad7b8862',
        'type': 'all',
        'with_vouchers': 'false',
    }

    response = requests.get('https://api.waitwaitpay.com/api/vendors/nearby', params=params, headers=headers)
    return response.text


def parse():
    for page in range(1, 10):
        encrypt_data = get_encrypt_data(page)
        decrypt_data = get_decrypt_data(encrypt_data)
        data_list = decrypt_data['result']['list']
        for data in data_list:
            shop_name = data['name']
            brand = data['brand']
            phone = data['phone']
            city = data['city_name']
            cate = data['category_name']
            address = data['address']
            avg_price = data['avg_price']
            tag_list = data['recommand_vouchers']
            tag = '；'.join([tag['title'] for tag in tag_list])
            discount_rate = data['discount_rate']
            print(
                f'店铺名称: {shop_name}\n品牌: {brand}\n电话: {phone}\n类别: {cate}\n标签: {tag}\n城市及详细地址: {city}；{address}\n人均{avg_price}，折扣: {discount_rate}折')
            print('===' * 20)


if __name__ == '__main__':
    parse()
