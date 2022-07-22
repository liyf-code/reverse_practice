# _*_ coding: utf-8 _*_
# @Date:  3:31 下午
# @File: md5_encrypt.py
# @Author: liyf

import hashlib
from loguru import logger


def encrypt(str) -> str:
    """
    实现md5加密
    :param str: 待加密字符串
    :return: 加密后的结果
    """
    md5 = hashlib.md5()
    # md5.update(str) 报错信息：TypeError: Unicode-objects must be encoded before hashing
    # 解决：必须指定encode
    md5.update(str.encode('utf8'))
    return md5.hexdigest()


if __name__ == '__main__':
    encrypt_str = '123456'
    logger.info(f'md5加密前为: {encrypt_str}')  # md5加密前为: 123456
    res = encrypt(encrypt_str)
    logger.info(f'md5加密后为: {res}')  # md5加密后为: e10adc3949ba59abbe56e057f20f883e
