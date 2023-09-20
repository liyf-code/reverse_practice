## changelog version 20230920

#### 搜狐网（souhu）

- 经观察，新闻详情页面: https://www.sohu.com/a/611710835_123753)
    - 包含的图片链接已经恢复正常，故该项目失效

#### 福建省公共资源交易-交易信息（ggzyfu_fujian）

- 获取请求头 `portal-sign` 时
    - md5盐值：`3637CB36B2E54A72A7002978D0506CDF` ==> `B3978D054A72A7002063637CCDF6B2E5`

- 响应数据解密
    - AES
    - key值: `BE45D593014E4A4EB4449737660876CE` ==> `EB444973714E4A40876CE66BE45D5930`
    - iv值: `A8909931867B0425` ==> `B5A8904209931867`

***

## changelog version 20230630

#### 查策网（chacewang）

- 请求头发生变化，解密方式未发生变化
    - 添加了登录认证
    - 请求头需携带 `authorization` 字段

#### 新榜资讯-废弃（newrank）

- 必须登录才能请求到数据

***

## changelog version 20230328

#### 易车网（yiche）

- api接口发生变化
    - 原接口 `https://car.yiche.com/web_api/car_model_api/api/v1/car/config_new_param`
    - 新接口 `https://mapi.yiche.com/web_api/car_model_api/api/v1/car/config_new_param`

#### 全国建筑市场监管公共服务平台 (jzsc)

- api接口变更
    - 原接口 `https://jzsc.mohurd.gov.cn/Api/webApi/dataservice/query/comp/list`
    - 新接口 `https://jzsc.mohurd.gov.cn/APi/webApi/dataservice/query/comp/list`
    - 具体是 `/Api/` 变为 `/APi/`。字母`p`由小写变为大写

***

## changelog version 20230314

#### 美食优惠聚合 (waitpay)

- 网站停止维护
- 主页: [https://static.waitwaitpay.com/web/sd_se/index.html#/](https://static.waitwaitpay.com/web/sd_se/index.html#/)

#### 中国招投标公告服务中心 (ctbpsp)

- 对响应数据进行解密的js进行变更
    - 原代码 `var keyHex = CryptoJS.enc.Utf8.parse("ctpstp@custominfo!@#qweASD");`
    - 新代码 `var keyHex = CryptoJS.enc.Utf8.parse("1qaz@wsx3e");`

#### 中国·国家地名信息库 (dmfw_mca)

- api接口变更
    - 原接口 `https://dmfw.mca.gov.cn/9095/stname/list`
    - 新接口 `https://dmfw.mca.gov.cn/stname/listPub`

- 响应数据变更
    - 原接口 https://dmfw.mca.gov.cn/9095/stname/list 响应数据为密文，需要解密
    - 新接口 https://dmfw.mca.gov.cn/stname/listPub 响应数据为明文

#### 全国建筑市场监管公共服务平台 (jzsc)

- api接口变更
    - 原接口 `http://jzsc.mohurd.gov.cn/api/webApi/dataservice/query/comp/list`
    - 新接口 `https://jzsc.mohurd.gov.cn/Api/webApi/dataservice/query/comp/list`

#### 黑猫投诉 (tousu_sign)

- 部分字段的解析规则发生变化
