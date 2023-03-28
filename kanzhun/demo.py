# _*_ coding: utf-8 _*_
# @Date:  2:09 下午
# @File: demo.py
# @Author: liyf

"""
典型的 webpack 案例
"""
import requests

from utils import *

ctx = Utils(js_file_name='demo.js').read_js_file()


def get_decrypt(company_id, page, encrypt_data, req_params):
    if not encrypt_data:  # 破解加密参数
        results = ctx.call('get_params_b_kiv', company_id, page)
    else:  # 对返回的加密数据进行解密
        results = ctx.call('get_decrypt_data', encrypt_data, req_params)
    return results


def get_encrypt_data(company_id, page):
    headers = {
        'authority': 'www.kanzhun.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }
    req_params = get_decrypt(company_id, page, encrypt_data=None, req_params=None)
    logger.info(f'加密后的参数: {req_params}')
    response = requests.get('https://www.kanzhun.com/api_to/com_salary_v2/list.json', params=req_params,
                            headers=headers)
    return req_params, response.text


def parse():
    company_id = '1HV52g~~'  # 华为
    for page in range(1, 10):
        req_params, encrypt_data = get_encrypt_data(company_id, page)
        decrypt_data = get_decrypt(None, None, encrypt_data, req_params)
        salary_list = decrypt_data['resdata']['salarys']
        for salary in salary_list:
            job_name = salary['jobTitle']
            avgSalary = salary['avgSalary']
            lowestSalary = salary['lowestSalary']
            highestSalary = salary['highestSalary']
            percentage = salary['percentage']
            staffCount = salary['staffCount']
            salaryContrast = salary['salaryContrast']
            tag = '增加' if salaryContrast == 1 else '减少'
            updateTime = salary['updateTime']
            print(
                f'职位名称: {job_name}\n数据来自 {staffCount} 名用户的贡献\n月均值: {avgSalary}\n较同行: {tag}{percentage}%\n同行最低工资: {lowestSalary}\n同行最高工资: {highestSalary}\n职位更新日期: {updateTime}')
            print('===' * 10)


if __name__ == '__main__':
    parse()
