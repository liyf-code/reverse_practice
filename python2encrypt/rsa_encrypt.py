# _*_ coding: utf-8 _*_
# @Date:  4:01 下午
# @File: rsa_encrypt.py
# @Author: liyf

import rsa


def encrypt(public_key, encrypt_str):
    """
    加密
    :param public_key: 公钥
    :param encrypt_res: 待加密内容
    :return: 加密后结果
    """
    encrypt_res = rsa.encrypt(encrypt_str.encode('utf8'), public_key)
    return encrypt_res


def decrypt(private_key, decrypt_res):
    """
    解密
    :param private_key: 私钥
    :param decrypt_res: 待解密内容
    :return: 解密结果
    """
    decrypt_res = rsa.decrypt(decrypt_res, private_key).decode('utf8')
    return decrypt_res


if __name__ == '__main__':
    # 生成256位的公钥和私钥
    public_key, private_key = rsa.newkeys(256)
    print(f'公钥: {public_key}')
    # 公钥: PublicKey(80329290882825905238094319536975561780227467875701686277278961529165919738557, 65537)
    print(f'私钥: {private_key}')
    # 私钥: PrivateKey(80329290882825905238094319536975561780227467875701686277278961529165919738557, 65537, 70670703944811224473393719296632436057098567468736946452812955406438254630273, 63972005125771969816027718000509430022301, 1255694435791011123719403715131447457)

    encrypt_str = '123456'
    print(f'待加密内容: {encrypt_str}')  # 待加密内容: 123456
    encrypt_res = encrypt(public_key, encrypt_str)
    print(f'rsa加密结果: {encrypt_res}')
    # rsa加密结果: b'SQ\x1f\xac\x9f\x91\xf4K\xc3H)c9\xa6\xf2<\xd4^b\xc2X\x95Z1\xcd\xee\xc0\xb2u\xd6\x90\xaf'
    decrypt_res = decrypt(private_key, encrypt_res)
    print(f'待解密内容: {encrypt_res}')
    # 待解密内容: b'\x9e\xac\x82\x87;A@7\x01\x1co\x06>W\xc9gy\xe3\xdc[l2\x14\xf0!+u\x8f\xe7N\xc4?'
    print(f'解密结果: {decrypt_res}')  # 解密结果: 123456
