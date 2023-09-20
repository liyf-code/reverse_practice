# _*_ coding: utf-8 _*_
# @Date:  4:33 下午
# @File: demo.py
# @Author: liyf

import re
import execjs
import requests

from loguru import logger

headers = {
    'authority': 'www.aliwx.com.cn',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
}


def get_html():
    params = {
        'bid': '6813923',
        'cid': '674259',
    }
    response = requests.get('https://www.aliwx.com.cn/reader', params=params, headers=headers)
    return response.text


def get_decrypt_data(encrypt_data):
    js_str = '''
    function _decodeCont(t) {
        return t = function (t) {
            return t.split("").map(function (t) {
                var e, i;
                return t.match(/[A-Za-z]/) ? (e = Math.floor(t.charCodeAt(0) / 97),
                    i = (t.toLowerCase().charCodeAt(0) - 83) % 26 || 26,
                    String.fromCharCode(i + (0 == e ? 64 : 96))) : t
            }).join("")
        }(t),
            function (t) {
                var e, i, a, n, r, c, o, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", d = "",
                    l = 0;
                for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < t.length;)
                    n = s.indexOf(t.charAt(l++)),
                        r = s.indexOf(t.charAt(l++)),
                        c = s.indexOf(t.charAt(l++)),
                        o = s.indexOf(t.charAt(l++)),
                        e = n << 2 | r >> 4,
                        i = (15 & r) << 4 | c >> 2,
                        a = (3 & c) << 6 | o,
                        d += String.fromCharCode(e),
                    64 != c && (d += String.fromCharCode(i)),
                    64 != o && (d += String.fromCharCode(a));
                return function (t) {
                    for (var e, i = "", a = 0, n = 0, r = 0; a < t.length;)
                        n = t.charCodeAt(a),
                            n < 128 ? (i += String.fromCharCode(n),
                                a++) : n > 191 && n < 224 ? (r = t.charCodeAt(a + 1),
                                i += String.fromCharCode((31 & n) << 6 | 63 & r),
                                a += 2) : (r = t.charCodeAt(a + 1),
                                e = t.charCodeAt(a + 2),
                                i += String.fromCharCode((15 & n) << 12 | (63 & r) << 6 | 63 & e),
                                a += 3);
                    return i
                }(d)
            }(t)
    }
    '''
    ctx = execjs.compile(''.join(js_str))
    decrypt_data = ctx.call('_decodeCont', encrypt_data)
    return decrypt_data


def get_info():
    html = get_html()
    a_str = re.findall(re.compile(r'dataChapters">(.*?)</i>', re.S), html)[0]
    data_info = str(a_str).replace('&quot;', '"').replace('true', 'True').replace('false', 'False').replace('amp;', '')
    item = eval(data_info)  # 字符串转字典
    data_list = item['chapterList']
    info = {
        volumedata['volumeName']: {
            # 判断是否为收费章节的条件为 isFreeRead 字段
            chapterdata['chapterName']: chapterdata['contUrlSuffix'] if chapterdata['isFreeRead'] else None
            for chapterdata in volumedata['volumeList']
        }
        for volumedata in data_list
    }
    return info


def get_encrypt_data():
    info = get_info()
    for volumeName, item in info.items():
        for chapterName, url_suffix in item.items():
            if url_suffix:
                logger.info(f'当前进度: {volumeName}, {chapterName}')
                url = f'https://c13.shuqireader.com/pcapi/chapter/contentfree/{url_suffix}'
                results = requests.get(url, headers=headers).json()
                encrypt_data = results['ChapterContent']
                logger.warning('\n'.join(get_decrypt_data(encrypt_data).split('<br/>')))
            else:
                logger.error(f'收费章节: {volumeName}, {chapterName}')
        break


if __name__ == '__main__':
    get_encrypt_data()
