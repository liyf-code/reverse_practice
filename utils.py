# _*_ coding: utf-8 _*_
# @Date:  4:37 下午
# @File: utils.py
# @Author: liyf

import execjs
import hashlib

import ddddocr

from loguru import logger

ocr = ddddocr.DdddOcr(show_ad=False)


class Utils:
    def __init__(self, js_file_name=None, origin_md5_str=None):
        '''
        初始化参数
        :param js_file_name: 需要读取的js文件名称
        :param origin_md5_str: 需要进行md5加密的字符串
        '''
        self.js_file_name = js_file_name
        self.origin_md5_str = origin_md5_str

    def read_js_file(self):
        f = open(self.js_file_name, 'r', encoding='utf8')
        js_str = f.read()
        ctx = execjs.compile(''.join(js_str))
        return ctx

    def encrypt_md5(self) -> str:
        md5 = hashlib.md5()
        md5.update(self.origin_md5_str.encode('utf8'))
        return md5.hexdigest()
