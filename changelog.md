## changelog version 20230314

#### 美食优惠聚合 (waitpay)

- 网站停止维护
- 主页: [https://static.waitwaitpay.com/web/sd_se/index.html#/](https://static.waitwaitpay.com/web/sd_se/index.html#/)

#### 中国招投标公告服务中心 (ctbpsp)

- 对响应数据进行解密的js进行变更
  ```javascript
  var keyHex = CryptoJS.enc.Utf8.parse("ctpstp@custominfo!@#qweASD");
  变为
  var keyHex = CryptoJS.enc.Utf8.parse("1qaz@wsx3e");
  
  ```

#### 中国·国家地名信息库 (dmfw_mca)

- 接口变更
  ```text
  https://dmfw.mca.gov.cn/9095/stname/list
   改变为 
  https://dmfw.mca.gov.cn/stname/listPub
  ```
- 响应数据变更
    - 原接口 https://dmfw.mca.gov.cn/9095/stname/list 响应数据为密文，需要解密
    - 新接口 https://dmfw.mca.gov.cn/stname/listPub 响应数据为明文

#### 全国建筑市场监管公共服务平台 (jzsc)

- 接口变更
    - 原接口：http://jzsc.mohurd.gov.cn/api/webApi/dataservice/query/comp/list
    - 变更后的接口： https://jzsc.mohurd.gov.cn/Api/webApi/dataservice/query/comp/list

#### 黑猫投诉 (tousu_sign)

- 部分字段的解析规则发生变化
