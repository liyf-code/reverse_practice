# _*_ coding: utf-8 _*_
# @Date:  6:19 下午
# @File: sha_encrypt.py
# @Author: liyf

import hashlib
from loguru import logger


def sha1(text):
    results = hashlib.sha1(text.encode('utf8')).hexdigest()
    return results


def sha256(text):
    results = hashlib.sha256(text.encode('utf8')).hexdigest()
    return results


def sha512(text):
    results = hashlib.sha512(text.encode('utf8')).hexdigest()
    return results


if __name__ == '__main__':
    text = '123456'
    logger.info(f'加密前的字符串: {text}')  # 加密前的字符串: 123456
    res_sha1 = sha1(text)
    logger.success(f'sha1\n\tsha1加密结果: {res_sha1}\n\t长度: {len(res_sha1)}')
    # sha1加密结果: 7c4a8d09ca3762af61e59520943dc26494f8941b
    # 长度: 40
    res_sha256 = sha256(text)
    logger.success(f'sha256\n\tsha256加密结果: {res_sha256}\n\t长度: {len(res_sha256)}')
    # sha256加密结果: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
    # 长度: 64
    res_sha512 = sha512(text)
    logger.success(f'sha512\n\tsha512加密结果: {res_sha512}\n\t长度: {len(res_sha512)}')
    # sha512加密结果: ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413
    # 长度: 128
