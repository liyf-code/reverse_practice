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
