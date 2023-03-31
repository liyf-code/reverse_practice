# _*_ coding: utf-8 _*_
# @Date:  11:30 上午
# @File: demo.py
# @Author: liyf

'''
主页地址: https://www.hfax.com/login.html#/?rsrc=https%3A%2F%2Fwww.hfax.com%2Fabout.html%23%2Fquestions

逆向参数: 登录所需的pwd
加密方式: 加盐的md5

todo list
- 全局搜索 `password:`
    - 可定位参数在 `login.xxx.js` 文件中。点击进入该文件之后，在再该文件中重新搜索 `password:`，可定位到以下代码
    - a = encryptByDES(this.password);
- 在该处下断点，重新点击登录按钮，断点生效。
    - 单步调试，进入该函数后，发现以下代码
    - CryptoJS.MD5(t + "TuD00Iqz4ge7gzIe2rmjSAFFKtaIBmnr8S").toString()
- 经过测试，该参数为md5加密
    - 在原密码的后边拼接了 `TuD00Iqz4ge7gzIe2rmjSAFFKtaIBmnr8S`，然后在进行md5加密

'''

import requests

from utils import *

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
}
cookies = {
    # 经过测试，请求头中的cookies必须带上，并且里边的session不可少，值可为None
    'SESSION': None,
}


def get_image_msg():
    response = requests.get('https://www.hfax.com/pc-api/common/imageCode/login', headers=headers, cookies=cookies)
    results = response.json()
    data = results['data']
    img_base64 = data['base64Str']
    img_token = data['token']
    return img_base64, img_token


def verify_captcha(base64str):
    '''
    根据接收的base64图片，识别结果并返回
    :param base64str: 原始的图片base64信息，data:image/png;base64,/9j/4AA
    :return:
    '''
    # 把 data:image/png;base64,的图片前缀信息删掉，这不属于图片内的信息
    image_base64 = str(base64str).split('base64,')[-1]
    res_code = ocr.classification(image_base64)
    return res_code


def login(user_name, pwd):
    base64str, token = get_image_msg()
    img_code = verify_captcha(base64str)
    logger.info(f'验证码识别结果: {img_code}')
    encrypt_pwd = Utils(origin_md5_str=f'{pwd}TuD00Iqz4ge7gzIe2rmjSAFFKtaIBmnr8S').encrypt_md5()
    logger.info(f'加密之后的密码: {encrypt_pwd}')
    json_data = {
        'username': user_name,
        'password': encrypt_pwd,
        'imgCode': img_code,
        'imgToken': token,
    }
    response = requests.post('https://www.hfax.com/pc-api/user/login', headers=headers, json=json_data, cookies=cookies)
    return response.json()


def main():
    res = login('12345768090', '123456')
    # 因为我使用的是错误的账号和密码，故以下代码肯定能取到值
    code = res['errCode']
    msg = res['errMsg']
    logger.info(f'\nerror code: {code}\nerror msg: {msg}')


if __name__ == '__main__':
    main()
