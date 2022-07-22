# _*_ coding: utf-8 _*_
# @Date:  3:40 下午
# @File: base64_encrypt.py
# @Author: liyf
import base64
from loguru import logger


def base64_encode(encrypt_str):
    """
    编码
    :param str: 待编码的内容
    :return: 编码后的结果，返回字节类型
    """
    # base64.b64encode(str) 报错：TypeError: a bytes-like object is required, not 'str'
    # 解决：str指定encode
    encode_res = base64.b64encode(encrypt_str.encode())
    return encode_res


def base64_decode(encode_res):
    """
    解码
    :param str: 待解码的内容
    :return: 解码后的结果
    """
    decode_res = base64.b64decode(encode_res)
    return decode_res


if __name__ == '__main__':
    encrypt_str = '123456'
    logger.info(f'待编码内容: {encrypt_str}')  # 待编码内容: 123456
    encode_res = base64_encode(encrypt_str)
    logger.info(f'Base64 编码结果: {encode_res}')  # Base64 编码结果: b'dXRmOA=='

    decode_res = base64_decode(encode_res)
    logger.info(f'待解码内容: {encode_res}')  # 待解码内容: b'dXRmOA=='
    logger.info(f'Base64 解码结果: {decode_res}')  # Base64 解码结果: b'123456'
