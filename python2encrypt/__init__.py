# _*_ coding: utf-8 _*_
# @Date:  3:30 下午
# @File: __init__.py.py
# @Author: liyf
import base64


def base64_encode(text):
    encode_data = base64.b64encode(text.encode())
    return encode_data


def base64_decode(encode_data):
    decode_data = base64.b64decode(encode_data)
    return decode_data


if __name__ == '__main__':
    text = 'I love Python!'
    encode_data = base64_encode(text)
    decode_data = base64_decode(encode_data)
    print('Base64 编码：', encode_data)
    print('Base64 解码：', decode_data)